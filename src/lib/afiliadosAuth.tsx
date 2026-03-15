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

  const fetchAfiliadoWithRetry = async (userId: string, maxRetries = 3): Promise<Afiliado | null> => {
    for (let i = 0; i < maxRetries; i++) {
      const { data, error } = await supabase
        .from('afiliados')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching afiliado:', error);
        if (i < maxRetries - 1) {
          await sleep(1000);
          continue;
        }
        return null;
      }

      if (data) {
        return data as Afiliado;
      }

      if (i < maxRetries - 1) {
        await sleep(1000);
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
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
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  };

  const signUp = async (email: string, password: string, nombre: string, ref: string) => {
    const cleanRef = ref.trim().toUpperCase();

    const { data: existing } = await supabase
      .from('afiliados')
      .select('id')
      .eq('ref', cleanRef)
      .maybeSingle();

    if (existing) return { error: 'Este código de afiliado ya está en uso.' };

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre, ref: cleanRef },
      },
    });

    if (authError) return { error: authError.message };
    if (!authData.user) return { error: 'Error al crear el usuario.' };

    await sleep(1500);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) return { error: signInError.message };

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
