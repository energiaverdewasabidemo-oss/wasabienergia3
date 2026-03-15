import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Mail, Lock, User, Hash, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useAfiliadosAuth } from '../../lib/afiliadosAuth';

const AfiliadosRegistro = () => {
  const { signUp } = useAfiliadosAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', email: '', password: '', ref: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'ref') {
      const clean = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      setForm(prev => ({ ...prev, ref: clean }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.ref.length < 3) {
      setError('El código de afiliado debe tener al menos 3 caracteres.');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    const { error } = await signUp(form.email, form.password, form.nombre, form.ref);

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate('/afiliados', { replace: true }), 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#222] to-[#1A1A1A] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#A8FF00]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#A8FF00]/40">
            <CheckCircle className="h-10 w-10 text-[#A8FF00]" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Cuenta creada</h2>
          <p className="text-gray-400">Redirigiendo al panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#222] to-[#1A1A1A] flex items-center justify-center px-4 py-12">
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
          <h1 className="text-3xl font-black text-white mb-2">Hazte Afiliado</h1>
          <p className="text-gray-400">Gana comisiones por cada cliente que refieras</p>
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
              <label className="block text-sm font-semibold text-gray-300 mb-2">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  name="nombre"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full bg-[#1A1A1A] border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#A8FF00] focus:outline-none focus:ring-1 focus:ring-[#A8FF00]/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full bg-[#1A1A1A] border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#A8FF00] focus:outline-none focus:ring-1 focus:ring-[#A8FF00]/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-[#1A1A1A] border border-gray-600 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:border-[#A8FF00] focus:outline-none focus:ring-1 focus:ring-[#A8FF00]/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Código de afiliado
                <span className="ml-2 text-xs text-gray-500 font-normal">Solo letras y números, sin espacios</span>
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  name="ref"
                  required
                  value={form.ref}
                  onChange={handleChange}
                  placeholder="MICODIGO"
                  maxLength={20}
                  className="w-full bg-[#1A1A1A] border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#A8FF00] focus:outline-none focus:ring-1 focus:ring-[#A8FF00]/50 transition-colors font-mono tracking-wider"
                />
              </div>
              {form.ref && (
                <p className="mt-2 text-xs text-gray-500">
                  Tu link sera: <span className="text-[#A8FF00]">wasabienergia.es/subir-factura?ref={form.ref}</span>
                </p>
              )}
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
                  <span>Crear cuenta</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm">
              Ya tienes cuenta?{' '}
              <Link to="/afiliados/login" className="text-[#A8FF00] font-semibold hover:underline">
                Inicia sesion
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

export default AfiliadosRegistro;
