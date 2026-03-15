import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export interface Afiliado {
  id: string;
  email: string;
  nombre: string;
  ref: string;
  created_at: string;
}

interface AfiliadosAuthContextType {
  user: User | null;
  afiliado: Afiliado | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, nombre: string, ref: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AfiliadosAuthContext = createContext<AfiliadosAuthContextType | null>(null);

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const AfiliadosAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [afiliado, setAfiliado] = useState<Afiliado | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAfiliadoWithRetry = async (userId: string, maxRetries = 5): Promise<Afiliado | null> => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const { data, error } = await supabase
          .from('afiliados')
          .select('*')
          .eq('id', userId)
          .limit(1);

        if (error) {
          console.error(`Error fetching afiliado (intento ${i + 1}/${maxRetries}):`, error.message);
          if (i < maxRetries - 1) {
            await sleep(1500 * (i + 1));
            continue;
          }
          return null;
        }

        if (data && data.length > 0) {
          return data[0] as Afiliado;
        }

        if (i < maxRetries - 1) {
          await sleep(1500 * (i + 1));
        }
      } catch (err: any) {
        console.error(`Exception fetching afiliado (intento ${i + 1}/${maxRetries}):`, err?.message || err);
        if (i < maxRetries - 1) {
          await sleep(1500 * (i + 1));
          continue;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const afiliadoData = await fetchAfiliadoWithRetry(session.user.id);
        setAfiliado(afiliadoData);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          setLoading(true);
          const afiliadoData = await fetchAfiliadoWithRetry(session.user.id);
          setAfiliado(afiliadoData);
          setLoading(false);
        } else {
          setAfiliado(null);
          setLoading(false);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error: 'Email o contraseña incorrectos' };
    }

    if (authData.user) {
      await sleep(500);
      const { data: existingAfiliado } = await supabase
        .from('afiliados')
        .select('id')
        .eq('id', authData.user.id)
        .limit(1);

      if (!existingAfiliado || existingAfiliado.length === 0) {
        const nombre = authData.user.user_metadata?.nombre || authData.user.email?.split('@')[0] || 'Usuario';
        const ref = authData.user.user_metadata?.ref || authData.user.id.substring(0, 8).toUpperCase();

        try {
          await supabase.from('afiliados').insert({
            id: authData.user.id,
            email: authData.user.email!,
            nombre,
            ref,
          });
        } catch (insertError) {
          console.error('Error creating afiliado record:', insertError);
        }
      }
    }

    return { error: null };
  };

  const signUp = async (email: string, password: string, nombre: string, ref: string) => {
    const cleanRef = ref.trim().toUpperCase();

    const { data: existing } = await supabase
      .from('afiliados')
      .select('id')
      .eq('ref', cleanRef)
      .limit(1);

    if (existing && existing.length > 0) return { error: 'Este código de afiliado ya está en uso.' };

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/afiliados/panel',
        data: { nombre, ref: cleanRef },
      },
    });

    if (authError) return { error: authError.message };
    if (!authData.user) return { error: 'Error al crear el usuario.' };

    if (authData.session) {
      await sleep(500);
      const { data: afiliadoCheck } = await supabase
        .from('afiliados')
        .select('id')
        .eq('id', authData.user.id)
        .limit(1);

      if (!afiliadoCheck || afiliadoCheck.length === 0) {
        await supabase.from('afiliados').insert({
          id: authData.user.id,
          email: authData.user.email!,
          nombre,
          ref: cleanRef,
        });
      }
      return { error: null };
    }

    await sleep(1500);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) return { error: signInError.message };

    await sleep(500);
    const { data: afiliadoCheck2 } = await supabase
      .from('afiliados')
      .select('id')
      .eq('id', authData.user.id)
      .limit(1);

    if (!afiliadoCheck2 || afiliadoCheck2.length === 0) {
      await supabase.from('afiliados').insert({
        id: authData.user.id,
        email: authData.user.email!,
        nombre,
        ref: cleanRef,
      });
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AfiliadosAuthContext.Provider value={{ user, afiliado, session, loading, signIn, signUp, signOut }}>
      {children}
    </AfiliadosAuthContext.Provider>
  );
};

export const useAfiliadosAuth = () => {
  const ctx = useContext(AfiliadosAuthContext);
  if (!ctx) throw new Error('useAfiliadosAuth must be used within AfiliadosAuthProvider');
  return ctx;
};
