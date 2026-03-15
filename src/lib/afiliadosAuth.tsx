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

export const AfiliadosAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [afiliado, setAfiliado] = useState<Afiliado | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAfiliado = async (userId: string) => {
    const { data } = await supabase
      .from('afiliados')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    setAfiliado(data);
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchAfiliado(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setLoading(true);
        (async () => {
          await fetchAfiliado(session.user.id);
          setLoading(false);
        })();
      } else {
        setAfiliado(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
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

    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) return { error: authError.message };
    if (!authData.user) return { error: 'Error al crear el usuario.' };

    const { error: insertError } = await supabase.from('afiliados').insert({
      id: authData.user.id,
      email,
      nombre,
      ref: cleanRef,
    });

    if (insertError) return { error: insertError.message };
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
