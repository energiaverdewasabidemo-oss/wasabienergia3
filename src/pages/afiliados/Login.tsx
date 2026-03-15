import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAfiliadosAuth } from '../../lib/afiliadosAuth';

const AfiliadosLogin = () => {
  const { signIn, user } = useAfiliadosAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/afiliados', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    navigate('/afiliados', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#222] to-[#1A1A1A] flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A8FF00]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#A8FF00]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <img
              src="/wasabi-logo-main.png"
              alt="Energía Verde Wasabi"
              className="h-14 w-auto mx-auto"
              style={{ filter: 'contrast(1.4) brightness(1.3) saturate(1.4) drop-shadow(0 0 15px rgba(168, 255, 0, 0.6))' }}
            />
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Panel de Afiliados</h1>
          <p className="text-gray-400">Accede a tu panel para ver tus comisiones y leads</p>
        </div>

        <div className="bg-[#2A2A2A]/80 backdrop-blur-xl border border-[#A8FF00]/20 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center space-x-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
              <div className="flex items-center bg-[#1A1A1A] border border-gray-600 rounded-xl focus-within:border-[#A8FF00] focus-within:ring-1 focus-within:ring-[#A8FF00]/50 transition-colors">
                <Mail className="ml-4 flex-shrink-0 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="flex-1 bg-transparent px-3 py-3 text-white placeholder-gray-500 focus:outline-none"
                  style={{ WebkitBoxShadow: '0 0 0 1000px #1A1A1A inset', WebkitTextFillColor: 'white' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Contraseña</label>
              <div className="flex items-center bg-[#1A1A1A] border border-gray-600 rounded-xl focus-within:border-[#A8FF00] focus-within:ring-1 focus-within:ring-[#A8FF00]/50 transition-colors">
                <Lock className="ml-4 flex-shrink-0 h-5 w-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent px-3 py-3 text-white placeholder-gray-500 focus:outline-none"
                  style={{ WebkitBoxShadow: '0 0 0 1000px #1A1A1A inset', WebkitTextFillColor: 'white' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-4 flex-shrink-0 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#A8FF00] to-[#96E600] text-[#1A1A1A] py-3 rounded-xl font-black text-lg hover:shadow-lg hover:shadow-[#A8FF00]/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  <span>Entrar al panel</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm">
              ¿No tienes cuenta?{' '}
              <Link to="/afiliados/registro" className="text-[#A8FF00] font-semibold hover:underline">
                Regístrate aqui
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            Volver a la web
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AfiliadosLogin;
