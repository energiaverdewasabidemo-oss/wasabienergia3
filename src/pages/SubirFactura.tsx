import { useState, useEffect } from 'react';
import { Upload, CheckCircle, FileText, Phone, TrendingDown, ArrowRight, Zap, Shield, Star, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function SubirFactura() {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    codigo_postal: '',
    cups: '',
    tipoCliente: 'particular'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const storageKey = 'offerEndTime';

      let endTime = localStorage.getItem(storageKey);

      if (!endTime || parseInt(endTime) < now) {
        const newEndTime = now + (5 * 24 * 60 * 60 * 1000);
        localStorage.setItem(storageKey, newEndTime.toString());
        endTime = newEndTime.toString();
      }

      const difference = parseInt(endTime) - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        localStorage.removeItem(storageKey);
        calculateTimeLeft();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let facturaUrl: string | undefined;

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from('invoices')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`Error al subir la factura: ${uploadError.message}`);
        }

        const { data: urlData } = supabase.storage
          .from('invoices')
          .getPublicUrl(filePath);

        facturaUrl = urlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from('leads')
        .insert([
          {
            nombre: formData.nombre,
            telefono: formData.telefono,
            email: formData.email,
            codigo_postal: formData.codigo_postal,
            cups: formData.cups || null,
            factura_url: facturaUrl,
          }
        ]);

      if (insertError) {
        throw new Error(`Error al guardar los datos: ${insertError.message}`);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-[#A8FF00] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-[#1A1A1A]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            ¡Factura recibida con éxito!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Nuestro equipo está analizando tu factura en este momento.<br />
            Te llamaremos en menos de 24 horas solo si podemos mejorar tu tarifa.
          </p>
          <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-2xl shadow-xl p-8 border border-[#A8FF00]/30">
            <h2 className="text-2xl font-semibold text-[#A8FF00] mb-4">
              ¿Qué ocurre ahora?
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#A8FF00]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#A8FF00] font-semibold">1</span>
                </div>
                <div>
                  <p className="text-white font-medium">Análisis detallado</p>
                  <p className="text-gray-400 text-sm">Revisamos tu contrato actual y comparamos con las mejores opciones del mercado</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#A8FF00]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#A8FF00] font-semibold">2</span>
                </div>
                <div>
                  <p className="text-white font-medium">Identificamos ahorros</p>
                  <p className="text-gray-400 text-sm">Calculamos exactamente cuánto puedes ahorrar al mes y al año</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#A8FF00]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#A8FF00] font-semibold">3</span>
                </div>
                <div>
                  <p className="text-white font-medium">Te contactamos</p>
                  <p className="text-gray-400 text-sm">Si encontramos una mejora, te llamamos. Si no, no te molestamos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#A8FF00]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-[#A8FF00]/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#96E600]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">

        {/* Hero Section con más impacto */}
        <div className="text-center mb-16 relative">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 bg-[#A8FF00]/20 border border-[#A8FF00]/40 rounded-full px-6 py-2 mb-6 backdrop-blur-sm animate-pulse">
            <Zap className="w-4 h-4 text-[#A8FF00]" />
            <span className="text-[#A8FF00] font-semibold text-sm">Análisis gratuito en menos de 24h</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight relative z-10">
            ¿Estás pagando de más en tu<br />
            <span className="text-[#A8FF00] relative inline-block">
              factura de luz
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-[#A8FF00]/20 blur-lg"></div>
            </span>
            <span className="text-[#A8FF00]">?</span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-4 max-w-3xl mx-auto relative z-10 font-light">
            Descúbrelo en menos de 24 horas. Sube tu factura y recibe un estudio gratuito sin compromiso.
          </p>

          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#A8FF00]/20 to-[#96E600]/20 border-2 border-[#A8FF00] rounded-2xl px-8 py-4 mb-10">
            <TrendingDown className="w-8 h-8 text-[#A8FF00]" />
            <div className="text-left">
              <p className="text-white font-black text-2xl">Ahorra hasta 450€/año</p>
              <p className="text-[#A8FF00] text-sm font-semibold">Solo con subir tu factura ahora</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 transform hover:scale-110 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="relative z-10">Chatear con LuzIA</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-8 mt-10">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#A8FF00]" />
              <span className="text-gray-400 text-sm">100% Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#A8FF00]" />
              <span className="text-gray-400 text-sm">Sin compromiso</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#A8FF00]" />
              <span className="text-gray-400 text-sm">Gratis</span>
            </div>
          </div>
        </div>

        {/* Urgencia - Por qué ahora */}
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 rounded-3xl p-8 mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-orange-400 animate-pulse" />
            <h3 className="text-3xl font-black text-white">¿Por qué hacerlo AHORA?</h3>
            <Zap className="w-8 h-8 text-orange-400 animate-pulse" />
          </div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-4">
            <span className="text-orange-400 font-bold">Estamos en el mejor momento del año</span> para cambiar de tarifa y cerrar contratos más baratos.
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Las compañías eléctricas están lanzando ofertas agresivas. Cada día que esperas es dinero que pierdes.
          </p>
        </div>

        {/* Validación del problema */}
        <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-[#A8FF00]/30">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            La realidad que <span className="text-[#A8FF00]">nadie te cuenta</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-[#1A1A1A]/50 rounded-2xl border border-[#A8FF00]/20 hover:border-[#A8FF00]/40 transition-all duration-300">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-gray-300 font-medium mb-2">
                Estás pagando más que otros consumiendo menos
              </p>
            </div>
            <div className="text-center p-6 bg-[#1A1A1A]/50 rounded-2xl border border-[#A8FF00]/20 hover:border-[#A8FF00]/40 transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-gray-300 font-medium mb-2">
                No entiendes tu factura y estás pagando conceptos innecesarios
              </p>
            </div>
            <div className="text-center p-6 bg-[#1A1A1A]/50 rounded-2xl border border-[#A8FF00]/20 hover:border-[#A8FF00]/40 transition-all duration-300">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-orange-400" />
              </div>
              <p className="text-gray-300 font-medium mb-2">
                Estás en una tarifa antigua sin saberlo
              </p>
            </div>
          </div>
        </div>

        {/* Sección de Autoridad - Barra de progreso */}
        <div className="bg-gradient-to-br from-[#A8FF00]/10 to-[#96E600]/10 border-2 border-[#A8FF00]/40 rounded-3xl p-10 mb-16 text-center">
          <h3 className="text-4xl font-black text-white mb-8">
            Somos una de las asesorías energéticas que <span className="text-[#A8FF00]">más dinero ha ahorrado</span> a españoles
          </h3>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-bold text-lg">Ahorro total generado</span>
              <span className="text-[#A8FF00] font-black text-2xl">7.500.000€</span>
            </div>
            <div className="h-6 bg-[#1A1A1A] rounded-full overflow-hidden border-2 border-[#A8FF00]/30">
              <div className="h-full bg-gradient-to-r from-[#A8FF00] to-[#96E600] rounded-full animate-pulse" style={{width: '85%'}}></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#1A1A1A]/50 rounded-2xl p-6 border border-[#A8FF00]/30">
              <p className="text-[#A8FF00] font-black text-4xl mb-2">+30.000</p>
              <p className="text-gray-300 font-semibold">Clientes satisfechos</p>
            </div>
            <div className="bg-[#1A1A1A]/50 rounded-2xl p-6 border border-[#A8FF00]/30">
              <p className="text-[#A8FF00] font-black text-4xl mb-2">250€</p>
              <p className="text-gray-300 font-semibold">Ahorro medio anual</p>
            </div>
            <div className="bg-[#1A1A1A]/50 rounded-2xl p-6 border border-[#A8FF00]/30">
              <p className="text-[#A8FF00] font-black text-4xl mb-2">97%</p>
              <p className="text-gray-300 font-semibold">Tasa de satisfacción</p>
            </div>
          </div>
        </div>

        {/* Cómo funciona */}
        <div className="mb-16">
          <h2 className="text-5xl font-black text-white mb-4 text-center">
            Cómo <span className="text-[#A8FF00]">funciona</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">Solo 3 pasos simples para empezar a ahorrar</p>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Líneas conectoras en desktop */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#A8FF00]/50 via-[#A8FF00]/50 to-[#A8FF00]/50"></div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#A8FF00] to-[#96E600] rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-2xl shadow-2xl p-8 h-full border-2 border-[#A8FF00]/30 hover:border-[#A8FF00] transition-all duration-500 hover:shadow-[#A8FF00]/40 transform hover:scale-105 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-[#A8FF00] to-[#96E600] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#A8FF00]/50 group-hover:shadow-2xl group-hover:shadow-[#A8FF00]/70 transition-all duration-500 relative">
                  <span className="text-[#1A1A1A] text-3xl font-black">1</span>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#A8FF00] rounded-full animate-ping"></div>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-[#A8FF00] transition-colors">
                  Subes tu factura
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Rellena el formulario y adjunta tu última factura de luz. Tarda menos de 2 minutos.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#A8FF00] to-[#96E600] rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-2xl shadow-2xl p-8 h-full border-2 border-[#A8FF00]/30 hover:border-[#A8FF00] transition-all duration-500 hover:shadow-[#A8FF00]/40 transform hover:scale-105 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-[#A8FF00] to-[#96E600] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#A8FF00]/50 group-hover:shadow-2xl group-hover:shadow-[#A8FF00]/70 transition-all duration-500 relative">
                  <span className="text-[#1A1A1A] text-3xl font-black">2</span>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#A8FF00] rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-[#A8FF00] transition-colors">
                  Analizamos tu contrato
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Nuestro equipo revisa cada detalle y compara con las mejores opciones del mercado.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#A8FF00] to-[#96E600] rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-2xl shadow-2xl p-8 h-full border-2 border-[#A8FF00]/30 hover:border-[#A8FF00] transition-all duration-500 hover:shadow-[#A8FF00]/40 transform hover:scale-105 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-[#A8FF00] to-[#96E600] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#A8FF00]/50 group-hover:shadow-2xl group-hover:shadow-[#A8FF00]/70 transition-all duration-500 relative">
                  <span className="text-[#1A1A1A] text-3xl font-black">3</span>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#A8FF00] rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-[#A8FF00] transition-colors">
                  Te llamamos solo si podemos mejorarlo
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Si no hay mejora, no te molestamos. Así de simple.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enemigo Común */}
        <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl p-10 mb-16 border-2 border-[#A8FF00]/40 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6">
            <span className="text-4xl">🚫</span>
          </div>
          <h3 className="text-4xl font-black text-white mb-6">
            <span className="text-red-400">NO somos</span> los típicos pesados que te llaman constantemente
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl text-gray-300">
              <span className="text-[#A8FF00] font-bold">Nuestra metodología es diferente.</span> No somos los vendedores de luz de turno que te acosan sin parar.
            </p>
            <p className="text-lg text-gray-400">
              Te contactamos una sola vez, con un análisis real. Si podemos ahorrarte dinero, te lo contamos. Si no, no te molestamos más. Así de simple y transparente.
            </p>
          </div>
        </div>

        {/* Metodología - Objeto Brillante */}
        <div className="bg-gradient-to-br from-[#A8FF00]/5 to-[#96E600]/5 rounded-3xl p-10 mb-16 border border-[#A8FF00]/30">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#A8FF00] rounded-full mb-6">
              <span className="text-4xl">🎯</span>
            </div>
            <h3 className="text-4xl font-black text-white mb-4">
              Nuestra <span className="text-[#A8FF00]">metodología de análisis</span>
            </h3>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 text-center mb-8">
              Basada en más de <span className="text-[#A8FF00] font-bold">200.000 contratos revisados</span> y herramientas de inteligencia artificial
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#1A1A1A]/50 rounded-2xl p-6 border border-[#A8FF00]/20">
                <h4 className="text-[#A8FF00] font-black text-xl mb-3">✓ Análisis predictivo con IA</h4>
                <p className="text-gray-400">Comparamos tu factura con miles de tarifas en tiempo real para encontrar la mejor opción.</p>
              </div>
              <div className="bg-[#1A1A1A]/50 rounded-2xl p-6 border border-[#A8FF00]/20">
                <h4 className="text-[#A8FF00] font-black text-xl mb-3">✓ Base de datos actualizada</h4>
                <p className="text-gray-400">Acceso a todas las ofertas del mercado, incluyendo las que no se publicitan.</p>
              </div>
              <div className="bg-[#1A1A1A]/50 rounded-2xl p-6 border border-[#A8FF00]/20">
                <h4 className="text-[#A8FF00] font-black text-xl mb-3">✓ Análisis de consumo</h4>
                <p className="text-gray-400">Estudiamos tu patrón de consumo para optimizar al máximo tu ahorro.</p>
              </div>
              <div className="bg-[#1A1A1A]/50 rounded-2xl p-6 border border-[#A8FF00]/20">
                <h4 className="text-[#A8FF00] font-black text-xl mb-3">✓ 92% de éxito</h4>
                <p className="text-gray-400">En más del 92% de casos encontramos ahorros significativos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp LuzIA */}
        <div id="formulario" className="relative mb-16 scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            {/* Header del formulario */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-3xl mb-6 shadow-2xl shadow-[#25D366]/50 animate-pulse">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                Habla con <span className="text-[#25D366]">LuzIA</span>
              </h2>
              <p className="text-xl text-gray-300">
                Nuestro comparador inteligente en WhatsApp. Respuesta instantánea.
              </p>
            </div>

            {/* WhatsApp CTA Card */}
            <div className="max-w-4xl mx-auto">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#25D366] rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse"></div>

                <div className="relative bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl overflow-hidden border-2 border-[#25D366]/60 shadow-2xl">
                  {/* Efectos de fondo */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 right-10 w-96 h-96 bg-[#25D366]/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#128C7E]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>

                  <div className="relative z-10 p-12 md:p-16 text-center">
                    {/* WhatsApp Icon */}
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full mb-8 shadow-2xl shadow-[#25D366]/50 group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>

                    {/* Content */}
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                      Chatea con <span className="text-[#25D366]">LuzIA</span><br />
                      <span className="text-2xl md:text-3xl text-gray-400 font-semibold">Tu asesora energética 24/7</span>
                    </h3>

                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                      Envía tu factura por WhatsApp y recibe un análisis completo al instante.
                      Sin formularios, sin esperas.
                    </p>

                    {/* Benefits */}
                    <div className="grid md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
                      <div className="bg-[#25D366]/10 rounded-2xl p-4 border border-[#25D366]/30">
                        <div className="text-3xl mb-2">⚡</div>
                        <p className="text-white font-bold text-sm">Respuesta instantánea</p>
                      </div>
                      <div className="bg-[#25D366]/10 rounded-2xl p-4 border border-[#25D366]/30">
                        <div className="text-3xl mb-2">🤖</div>
                        <p className="text-white font-bold text-sm">IA especializada</p>
                      </div>
                      <div className="bg-[#25D366]/10 rounded-2xl p-4 border border-[#25D366]/30">
                        <div className="text-3xl mb-2">💰</div>
                        <p className="text-white font-bold text-sm">Ahorro garantizado</p>
                      </div>
                    </div>

                    {/* WhatsApp Button */}
                    <a
                      href="https://wa.me/34610764494?text=Hola%20LuzIA!%20Quiero%20ver%20el%20mejor%20precio%20para%20mi%20factura%20de%20luz.%20Inf%C3%B3rmame%20por%20favor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-flex items-center gap-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-12 py-6 rounded-full text-2xl font-black hover:shadow-2xl hover:shadow-[#25D366]/60 transition-all duration-300 transform hover:scale-110 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>

                      <svg className="w-8 h-8 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>

                      <span className="relative z-10">Chatear con LuzIA ahora</span>

                      <ArrowRight className="w-8 h-8 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                    </a>

                    {/* Footer info */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gray-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#25D366]" />
                        <span className="text-sm font-semibold">Sin instalación</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-[#25D366]" />
                        <span className="text-sm font-semibold">100% Seguro</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#25D366]" />
                        <span className="text-sm font-semibold">Gratis</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extra trust indicators */}
              <div className="mt-8 text-center">
                <p className="text-gray-400 text-lg mb-4">
                  O si prefieres, llámanos directamente
                </p>
                <a
                  href="tel:+34621508300"
                  className="inline-flex items-center gap-3 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 border border-[#25D366]/30 hover:border-[#25D366]/60"
                >
                  <Phone className="w-5 h-5 text-[#25D366]" />
                  <span>+34 621 50 83 00</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Nuestro Equipo - Liderazgo */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              El <span className="text-[#A8FF00]">equipo</span> detrás de Wasabi
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Caras reales, personas reales comprometidas con tu ahorro
            </p>
          </div>

          {/* Líderes destacados */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* José Calero - CEO */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#A8FF00] to-[#96E600] rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl overflow-hidden border-2 border-[#A8FF00]/40 group-hover:border-[#A8FF00] transition-all duration-300">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="/WhatsApp_Image_2026-03-03_at_20.47.45.jpeg"
                    alt="José Calero - Fundador de Wasabi"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="inline-flex items-center gap-2 bg-[#A8FF00] text-[#1A1A1A] px-4 py-1 rounded-full text-xs font-black uppercase mb-3">
                    <span>⭐</span> Fundador de Wasabi
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2">José Calero</h3>
                  <p className="text-[#A8FF00] font-bold text-lg mb-3">CEO & Fundador</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Creador de la metodología que ha ayudado a más de 15.000 familias a ahorrar en su factura de luz
                  </p>
                </div>
              </div>
            </div>

            {/* Franco Tenaglia - Patrocinador */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl overflow-hidden border-2 border-yellow-500/40 group-hover:border-yellow-500 transition-all duration-300">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="/641231069_18530982796069231_5302681181679109432_n.jpg"
                    alt="Franco Tenaglia - Patrocinador"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="inline-flex items-center gap-2 bg-yellow-500 text-[#1A1A1A] px-4 py-1 rounded-full text-xs font-black uppercase mb-3">
                    <span>🏆</span> Patrocinador
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2">Franco Tenaglia</h3>
                  <p className="text-yellow-500 font-bold text-lg mb-3">Patrocinador Oficial</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Apoyando la misión de hacer el ahorro energético accesible para todos los españoles
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resto del equipo */}
          <div className="bg-gradient-to-br from-[#2A2A2A]/50 to-[#1A1A1A]/50 rounded-3xl p-8 border border-[#A8FF00]/20">
            <h3 className="text-3xl font-black text-white text-center mb-8">
              Nuestro <span className="text-[#A8FF00]">equipo de asesores</span>
            </h3>
            <div className="grid md:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {[
                { name: 'Carlos M.', role: 'Especialista', emoji: '💡' },
                { name: 'Ana R.', role: 'Asesora', emoji: '⚡' },
                { name: 'David L.', role: 'Analista', emoji: '📊' },
                { name: 'Laura G.', role: 'Consultora', emoji: '🎯' },
                { name: 'Miguel S.', role: 'Técnico', emoji: '🔧' },
                { name: 'Paula J.', role: 'PYME', emoji: '🏢' }
              ].map((asesor, index) => (
                <div
                  key={index}
                  className="bg-[#1A1A1A]/70 rounded-xl p-4 border border-[#A8FF00]/20 hover:border-[#A8FF00]/60 transition-all duration-300 text-center group hover:scale-105"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{asesor.emoji}</div>
                  <h4 className="text-white font-bold text-sm mb-1">{asesor.name}</h4>
                  <p className="text-[#A8FF00] text-xs font-semibold">{asesor.role}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-center mt-6">
              Y más de <span className="text-[#A8FF00] font-bold">15 profesionales certificados</span> listos para ayudarte
            </p>
          </div>
        </div>

        {/* Testimonios Premium */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#A8FF00]/20 to-[#96E600]/20 border border-[#A8FF00]/40 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
              <Star className="w-6 h-6 text-[#A8FF00] fill-[#A8FF00]" />
              <span className="text-[#A8FF00] font-black text-lg">+30.000 clientes satisfechos</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              Lo que dicen <span className="text-[#A8FF00]">nuestros clientes</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Miles de personas ya están ahorrando en su factura de luz
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Testimonio 1 */}
            <div className="group relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A8FF00] to-[#96E600] rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>

              <div className="relative bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl p-8 border-2 border-[#A8FF00]/20 group-hover:border-[#A8FF00]/60 transition-all duration-300 h-full flex flex-col">
                {/* Quote icon */}
                <div className="text-[#A8FF00]/30 text-6xl font-serif mb-4 leading-none">"</div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative">
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                    </div>
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-300 text-lg leading-relaxed mb-4 flex-grow">
                  Solo con una llamada en 24 horas, ya pude ahorrar <span className="text-[#A8FF00] font-bold">250€ al año</span>. Increíble lo fácil que fue.
                </p>

                <div className="bg-[#A8FF00]/10 rounded-xl p-3 mb-6 border border-[#A8FF00]/30">
                  <p className="text-[#A8FF00] text-sm font-semibold">💰 Con ese ahorro me fui de vacaciones a Portugal</p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-[#A8FF00]/20">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A8FF00] to-[#96E600] flex items-center justify-center text-[#1A1A1A] font-black text-xl shadow-lg shadow-[#A8FF00]/30">
                    M
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">María González</p>
                    <p className="text-gray-400 text-sm">Particular · Madrid</p>
                  </div>
                </div>

                {/* Badge de ahorro */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl px-4 py-2 shadow-xl shadow-yellow-500/30 rotate-6 group-hover:rotate-12 transition-transform duration-300">
                  <p className="text-[#1A1A1A] font-black text-sm">250€/año</p>
                </div>
              </div>
            </div>

            {/* Testimonio 2 - Destacado */}
            <div className="group relative md:-translate-y-4">
              {/* Glow effect más fuerte */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#A8FF00] to-[#96E600] rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition duration-500 animate-pulse"></div>

              <div className="relative bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl p-8 border-2 border-[#A8FF00]/60 group-hover:border-[#A8FF00] transition-all duration-300 h-full flex flex-col shadow-2xl shadow-[#A8FF00]/20">
                {/* Quote icon */}
                <div className="text-[#A8FF00]/30 text-6xl font-serif mb-4 leading-none">"</div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative">
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                    </div>
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-300 text-lg leading-relaxed mb-4 flex-grow">
                  En 24 horas me llamaron con un análisis completo. Ahora mi empresa ahorra <span className="text-[#A8FF00] font-bold">6.800€ al año</span>.
                </p>

                <div className="bg-[#A8FF00]/10 rounded-xl p-3 mb-6 border border-[#A8FF00]/30">
                  <p className="text-[#A8FF00] text-sm font-semibold">🏢 Ese dinero lo invertimos en ampliar el negocio</p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-[#A8FF00]/20">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A8FF00] to-[#96E600] flex items-center justify-center text-[#1A1A1A] font-black text-xl shadow-lg shadow-[#A8FF00]/30">
                    C
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Carlos Martín</p>
                    <p className="text-gray-400 text-sm">Empresa · Barcelona</p>
                  </div>
                </div>

                {/* Badge de ahorro */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl px-4 py-2 shadow-xl shadow-yellow-500/30 rotate-6 group-hover:rotate-12 transition-transform duration-300">
                  <p className="text-[#1A1A1A] font-black text-sm">6.800€/año</p>
                </div>

                {/* Badge "Más popular" */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A8FF00] text-[#1A1A1A] px-4 py-1 rounded-full text-xs font-black uppercase">
                  Caso destacado
                </div>
              </div>
            </div>

            {/* Testimonio 3 */}
            <div className="group relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A8FF00] to-[#96E600] rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>

              <div className="relative bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl p-8 border-2 border-[#A8FF00]/20 group-hover:border-[#A8FF00]/60 transition-all duration-300 h-full flex flex-col">
                {/* Quote icon */}
                <div className="text-[#A8FF00]/30 text-6xl font-serif mb-4 leading-none">"</div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative">
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                    </div>
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-300 text-lg leading-relaxed mb-4 flex-grow">
                  Me llamaron en menos de un día y ahora ahorro <span className="text-[#A8FF00] font-bold">240€ al año</span>. Proceso súper rápido y sin complicaciones.
                </p>

                <div className="bg-[#A8FF00]/10 rounded-xl p-3 mb-6 border border-[#A8FF00]/30">
                  <p className="text-[#A8FF00] text-sm font-semibold">✈️ Ese dinero lo usé para un viaje con mi familia</p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-[#A8FF00]/20">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A8FF00] to-[#96E600] flex items-center justify-center text-[#1A1A1A] font-black text-xl shadow-lg shadow-[#A8FF00]/30">
                    A
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Ana López</p>
                    <p className="text-gray-400 text-sm">Particular · Valencia</p>
                  </div>
                </div>

                {/* Badge de ahorro */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl px-4 py-2 shadow-xl shadow-yellow-500/30 rotate-6 group-hover:rotate-12 transition-transform duration-300">
                  <p className="text-[#1A1A1A] font-black text-sm">240€/año</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-12 bg-gradient-to-r from-[#2A2A2A] via-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-8 border border-[#A8FF00]/30">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-black text-[#A8FF00] mb-2">30K+</p>
                <p className="text-gray-400 font-semibold">Clientes satisfechos</p>
              </div>
              <div>
                <p className="text-4xl font-black text-[#A8FF00] mb-2">250€</p>
                <p className="text-gray-400 font-semibold">Ahorro medio/año</p>
              </div>
              <div>
                <p className="text-4xl font-black text-[#A8FF00] mb-2">24h</p>
                <p className="text-gray-400 font-semibold">Tiempo de respuesta</p>
              </div>
              <div>
                <p className="text-4xl font-black text-[#A8FF00] mb-2">98%</p>
                <p className="text-gray-400 font-semibold">Tasa de satisfacción</p>
              </div>
            </div>
          </div>
        </div>

        {/* Oficinas y Ubicación */}
        <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl p-10 mb-16 border border-[#A8FF00]/30">
          <div className="text-center mb-10">
            <h3 className="text-4xl font-black text-white mb-4">
              Visítanos en nuestras <span className="text-[#A8FF00]">oficinas</span>
            </h3>
            <p className="text-xl text-gray-400">Con presencia física en Valencia y Albacete</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
            {/* Oficina Valencia */}
            <div className="group bg-[#1A1A1A]/50 rounded-2xl p-8 border-2 border-[#A8FF00]/20 hover:border-[#A8FF00]/60 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#A8FF00]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-3xl">📍</span>
                </div>
                <h4 className="text-[#A8FF00] font-black text-2xl">Valencia</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1">🏢</span>
                  <div>
                    <p className="text-white font-semibold text-lg">Calle Andarella 2</p>
                    <p className="text-gray-400">46950 Valencia</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">📞</span>
                  <a href="tel:+34621508300" className="text-[#A8FF00] font-semibold hover:text-[#96E600] transition-colors">
                    +34 621 50 83 00
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">📧</span>
                  <a href="mailto:info@wasabienergia.com" className="text-[#A8FF00] font-semibold hover:text-[#96E600] transition-colors">
                    info@wasabienergia.com
                  </a>
                </div>
              </div>
            </div>

            {/* Oficina Albacete */}
            <div className="group bg-[#1A1A1A]/50 rounded-2xl p-8 border-2 border-[#A8FF00]/20 hover:border-[#A8FF00]/60 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#A8FF00]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-3xl">📍</span>
                </div>
                <h4 className="text-[#A8FF00] font-black text-2xl">Albacete</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1">🏢</span>
                  <div>
                    <p className="text-white font-semibold text-lg">Polígono Campollano - Calle A, 7</p>
                    <p className="text-gray-400">02006 Albacete</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">📞</span>
                  <a href="tel:+34621508300" className="text-[#A8FF00] font-semibold hover:text-[#96E600] transition-colors">
                    +34 621 50 83 00
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">📧</span>
                  <a href="mailto:info@wasabienergia.com" className="text-[#A8FF00] font-semibold hover:text-[#96E600] transition-colors">
                    info@wasabienergia.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Horario */}
          <div className="bg-[#1A1A1A]/50 rounded-2xl p-8 border border-[#A8FF00]/20 max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="w-12 h-12 bg-[#A8FF00]/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🕐</span>
              </div>
              <h4 className="text-[#A8FF00] font-black text-2xl">Horario de Atención</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-white font-semibold text-lg mb-2">Lunes a Viernes</p>
                <p className="text-[#A8FF00] text-2xl font-bold">09:00 - 17:00h</p>
              </div>
              <div>
                <p className="text-white font-semibold text-lg mb-2">Fin de Semana</p>
                <p className="text-gray-400 text-2xl font-bold">Cerrado</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 bg-[#A8FF00]/10 rounded-2xl px-6 py-4 border border-[#A8FF00]/30">
              <Shield className="w-6 h-6 text-[#A8FF00]" />
              <p className="text-white font-semibold">Empresa registrada y certificada en España</p>
            </div>
          </div>
        </div>

        {/* Oportunidad actual */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            El mejor momento es <span className="text-[#A8FF00]">ahora</span>
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-6">
            El mercado energético está en constante cambio. Cuando los precios están favorables, es cuando debes actuar.
            El mejor momento para revisar tu contrato no es cuando vuelve a subir.
          </p>
          <p className="text-2xl font-bold text-[#A8FF00] text-center">
            Es ahora.
          </p>
        </div>

        {/* Cierre final */}
        <div className="relative text-center bg-gradient-to-br from-[#2A2A2A] via-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-12 md:p-16 shadow-2xl border-2 border-[#A8FF00]/40 overflow-hidden">
          {/* Efectos de fondo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[#A8FF00]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#96E600]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="relative z-10">
            <div className="inline-block p-4 bg-[#A8FF00]/20 rounded-2xl mb-6">
              <Zap className="w-12 h-12 text-[#A8FF00] animate-pulse" />
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Sube tu factura y <span className="text-[#A8FF00]">sal de dudas</span> hoy mismo
            </h2>

            <p className="text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Sin compromiso. Sin letra pequeña. Solo te llamamos si podemos ayudarte.
            </p>

            <a
              href="https://wa.me/34610764494?text=Hola%20LuzIA!%20Quiero%20ver%20el%20mejor%20precio%20para%20mi%20factura%20de%20luz.%20Inf%C3%B3rmame%20por%20favor"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-12 py-6 rounded-full text-2xl font-black hover:shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 transform hover:scale-110 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <svg className="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="relative z-10">Chatear con LuzIA ahora</span>
              <ArrowRight className="w-7 h-7 relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Garantías */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 bg-[#2A2A2A]/80 px-4 py-2 rounded-full border border-[#A8FF00]/30">
                <CheckCircle className="w-5 h-5 text-[#A8FF00]" />
                <span className="text-gray-300 font-semibold">Respuesta en 24h</span>
              </div>
              <div className="flex items-center gap-2 bg-[#2A2A2A]/80 px-4 py-2 rounded-full border border-[#A8FF00]/30">
                <Shield className="w-5 h-5 text-[#A8FF00]" />
                <span className="text-gray-300 font-semibold">100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 bg-[#2A2A2A]/80 px-4 py-2 rounded-full border border-[#A8FF00]/30">
                <Star className="w-5 h-5 text-[#A8FF00]" />
                <span className="text-gray-300 font-semibold">Totalmente gratis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Garantía de confianza */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-2xl p-6 shadow-lg border border-[#A8FF00]/30">
            <Phone className="w-8 h-8 text-[#A8FF00]" />
            <div className="text-left">
              <p className="font-semibold text-white">
                Llevamos años analizando facturas energéticas
              </p>
              <p className="text-gray-400">
                Sabemos dónde están los errores y cómo optimizar cada contrato
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Legal */}
      <footer className="bg-gradient-to-br from-[#2A2A2A] via-[#1A1A1A] to-[#2A2A2A] border-t border-[#A8FF00]/20 py-12 relative">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">

          {/* Disclaimer de Meta/Facebook */}
          <div className="bg-[#1A1A1A]/80 rounded-2xl p-8 mb-10 border border-gray-700/50">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-400" />
              Aviso Legal sobre Publicidad
            </h3>
            <div className="text-gray-400 text-sm leading-relaxed space-y-3">
              <p>
                Este sitio web no forma parte de Facebook, Meta Platforms Inc., ni está respaldado por Facebook o Meta.
                FACEBOOK y META son marcas registradas de Meta Platforms, Inc.
              </p>
              <p>
                Esta página web utiliza publicidad de pago en plataformas de Meta (Facebook e Instagram) para promocionar
                nuestros servicios de asesoría energética. Los resultados mostrados son ejemplos reales de clientes, pero
                los resultados individuales pueden variar según cada caso particular.
              </p>
              <p className="text-xs text-gray-500">
                Descargo de responsabilidad: No garantizamos ahorros específicos. El ahorro real dependerá de tu contrato
                actual, consumo y las tarifas disponibles en el momento del análisis.
              </p>
            </div>
          </div>

          {/* Enlaces Legales */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div>
              <h4 className="text-[#A8FF00] font-bold mb-4 text-lg">Información Legal</h4>
              <div className="space-y-2">
                <a
                  href="/politica-privacidad.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-[#A8FF00] transition-colors text-sm"
                >
                  Política de Privacidad
                </a>
                <a
                  href="/aviso-legal.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-[#A8FF00] transition-colors text-sm"
                >
                  Aviso Legal
                </a>
                <a
                  href="/terminos-condiciones.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-[#A8FF00] transition-colors text-sm"
                >
                  Términos y Condiciones
                </a>
                <a
                  href="/cookies.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-[#A8FF00] transition-colors text-sm"
                >
                  Política de Cookies
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[#A8FF00] font-bold mb-4 text-lg">Contacto</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>Email: info@wasabienergia.com</p>
                <p>Teléfono: +34 621 50 83 00</p>
              </div>
            </div>

            <div>
              <h4 className="text-[#A8FF00] font-bold mb-4 text-lg">Oficinas</h4>
              <div className="space-y-3 text-gray-400 text-sm">
                <div>
                  <p className="font-semibold text-white">Valencia</p>
                  <p>Calle Andarella 2</p>
                  <p>46950 Valencia</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Albacete</p>
                  <p>Pol. Campollano - C/ A, 7</p>
                  <p>02006 Albacete</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[#A8FF00] font-bold mb-4 text-lg">Horario</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>Lunes a Viernes</p>
                <p className="text-white font-semibold">09:00 - 17:00h</p>
              </div>
            </div>
          </div>

          {/* Copyright y CIF */}
          <div className="border-t border-gray-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <div className="text-gray-400 text-sm">
                <p className="mb-1">© 2025 Energía Verde Wasabi SL - Todos los derechos reservados</p>
                <p className="text-xs text-gray-500">CIF: B42709378 | Energía 100% renovable certificada</p>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#A8FF00]" />
                <span className="text-gray-400 text-sm">Sitio web seguro y protegido</span>
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* Contador fijo minimalista en el footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#2A2A2A]/95 to-[#1A1A1A]/95 backdrop-blur-lg border-t border-[#A8FF00]/30 py-3 px-4 z-50 shadow-lg shadow-[#A8FF00]/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Texto */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#A8FF00]" />
              <span className="text-white text-sm font-semibold">Oferta termina en:</span>
            </div>

            {/* Contador */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-[#A8FF00] text-2xl font-black tabular-nums">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-gray-400 text-xs font-medium">d</span>
              </div>
              <span className="text-gray-600">:</span>
              <div className="flex items-center gap-1">
                <span className="text-[#A8FF00] text-2xl font-black tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-gray-400 text-xs font-medium">h</span>
              </div>
              <span className="text-gray-600">:</span>
              <div className="flex items-center gap-1">
                <span className="text-[#A8FF00] text-2xl font-black tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-gray-400 text-xs font-medium">m</span>
              </div>
              <span className="text-gray-600">:</span>
              <div className="flex items-center gap-1">
                <span className="text-[#A8FF00] text-2xl font-black tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-gray-400 text-xs font-medium">s</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="bg-[#A8FF00] hover:bg-[#96E600] text-[#1A1A1A] px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              Chatear ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
