import { useState } from 'react';
import { Upload, CheckCircle, FileText, Phone, TrendingDown, ArrowRight, Zap, Shield, Star } from 'lucide-react';
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
            <a
              href="#formulario"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#A8FF00] to-[#96E600] text-[#1A1A1A] px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-[#A8FF00]/50 transition-all duration-300 transform hover:scale-110 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <Upload className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Subir mi factura ahora</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
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
                Es posible que estés pagando más que otros consumiendo menos
              </p>
            </div>
            <div className="text-center p-6 bg-[#1A1A1A]/50 rounded-2xl border border-[#A8FF00]/20 hover:border-[#A8FF00]/40 transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-gray-300 font-medium mb-2">
                Es posible que no entiendas tu factura y estés pagando conceptos innecesarios
              </p>
            </div>
            <div className="text-center p-6 bg-[#1A1A1A]/50 rounded-2xl border border-[#A8FF00]/20 hover:border-[#A8FF00]/40 transition-all duration-300">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-orange-400" />
              </div>
              <p className="text-gray-300 font-medium mb-2">
                Es posible que estés en una tarifa antigua sin saberlo
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
              <span className="text-[#A8FF00] font-black text-2xl">10.000.000€</span>
            </div>
            <div className="h-6 bg-[#1A1A1A] rounded-full overflow-hidden border-2 border-[#A8FF00]/30">
              <div className="h-full bg-gradient-to-r from-[#A8FF00] to-[#96E600] rounded-full animate-pulse" style={{width: '85%'}}></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#1A1A1A]/50 rounded-2xl p-6 border border-[#A8FF00]/30">
              <p className="text-[#A8FF00] font-black text-4xl mb-2">+15.000</p>
              <p className="text-gray-300 font-semibold">Clientes satisfechos</p>
            </div>
            <div className="bg-[#1A1A1A]/50 rounded-2xl p-6 border border-[#A8FF00]/30">
              <p className="text-[#A8FF00] font-black text-4xl mb-2">450€</p>
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

        {/* Formulario Moderno */}
        <div id="formulario" className="relative mb-16 scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            {/* Header del formulario */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#A8FF00] to-[#96E600] rounded-3xl mb-6 shadow-2xl shadow-[#A8FF00]/50 animate-pulse">
                <Upload className="w-10 h-10 text-[#1A1A1A]" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                Sube tu <span className="text-[#A8FF00]">factura ahora</span>
              </h2>
              <p className="text-xl text-gray-300">
                Análisis gratuito y sin compromiso. Respuesta en menos de 24 horas.
              </p>
            </div>

            {/* Grid de dos columnas: Info + Formulario */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">

              {/* Columna izquierda - Beneficios */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl p-8 border border-[#A8FF00]/30">
                  <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#A8FF00]/20 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-[#A8FF00]" />
                    </div>
                    ¿Por qué con nosotros?
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-lg bg-[#A8FF00]/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-[#A8FF00]/20 transition-colors">
                        <Zap className="w-5 h-5 text-[#A8FF00]" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">Análisis experto</h4>
                        <p className="text-gray-400 leading-relaxed">
                          Revisamos cada línea de tu factura para encontrar oportunidades de ahorro que otros pasan por alto.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-lg bg-[#A8FF00]/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-[#A8FF00]/20 transition-colors">
                        <Shield className="w-5 h-5 text-[#A8FF00]" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">100% Seguro</h4>
                        <p className="text-gray-400 leading-relaxed">
                          Tus datos están protegidos y solo los usamos para analizar tu factura. Nunca los compartimos.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-lg bg-[#A8FF00]/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-[#A8FF00]/20 transition-colors">
                        <Star className="w-5 h-5 text-[#A8FF00]" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">Sin letra pequeña</h4>
                        <p className="text-gray-400 leading-relaxed">
                          Solo te contactamos si encontramos una mejora real. Si no hay ahorro, no te molestamos.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-lg bg-[#A8FF00]/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-[#A8FF00]/20 transition-colors">
                        <Phone className="w-5 h-5 text-[#A8FF00]" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">Respuesta rápida</h4>
                        <p className="text-gray-400 leading-relaxed">
                          Te llamamos en menos de 24 horas con el análisis completo y propuestas concretas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust badge adicional */}
                <div className="bg-gradient-to-r from-[#A8FF00]/10 to-[#96E600]/10 rounded-2xl p-6 border border-[#A8FF00]/30">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">⚡</div>
                    <div>
                      <p className="text-white font-bold text-lg">+10.000 clientes han confiado en nosotros</p>
                      <p className="text-gray-400">Con un ahorro promedio de 320€/año</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna derecha - Formulario */}
              <div className="relative">
                <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl p-8 md:p-10 border-2 border-[#A8FF00]/40 shadow-2xl relative overflow-hidden">
                  {/* Efectos de brillo */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#A8FF00]/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#96E600]/5 rounded-full blur-3xl"></div>

                  <div className="relative z-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Tipo de cliente con íconos */}
                      <div>
                        <label className="block text-white font-bold text-lg mb-3">
                          Tipo de cliente
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, tipoCliente: 'particular' })}
                            className={`group relative p-5 rounded-2xl border-2 font-bold transition-all duration-300 overflow-hidden ${
                              formData.tipoCliente === 'particular'
                                ? 'border-[#A8FF00] bg-[#A8FF00]/20 text-[#A8FF00] shadow-lg shadow-[#A8FF00]/20'
                                : 'border-gray-600 hover:border-[#A8FF00]/50 text-gray-300 hover:bg-[#A8FF00]/5'
                            }`}
                          >
                            {formData.tipoCliente === 'particular' && (
                              <div className="absolute inset-0 bg-gradient-to-br from-[#A8FF00]/10 to-transparent"></div>
                            )}
                            <div className="relative z-10 text-center">
                              <div className="text-3xl mb-2">👤</div>
                              <span>Particular</span>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, tipoCliente: 'empresa' })}
                            className={`group relative p-5 rounded-2xl border-2 font-bold transition-all duration-300 overflow-hidden ${
                              formData.tipoCliente === 'empresa'
                                ? 'border-[#A8FF00] bg-[#A8FF00]/20 text-[#A8FF00] shadow-lg shadow-[#A8FF00]/20'
                                : 'border-gray-600 hover:border-[#A8FF00]/50 text-gray-300 hover:bg-[#A8FF00]/5'
                            }`}
                          >
                            {formData.tipoCliente === 'empresa' && (
                              <div className="absolute inset-0 bg-gradient-to-br from-[#A8FF00]/10 to-transparent"></div>
                            )}
                            <div className="relative z-10 text-center">
                              <div className="text-3xl mb-2">🏢</div>
                              <span>Empresa</span>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Nombre */}
                      <div>
                        <label className="block text-white font-bold text-lg mb-3">
                          Nombre completo
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-600 bg-[#1A1A1A]/80 backdrop-blur-sm text-white focus:border-[#A8FF00] focus:bg-[#1A1A1A] focus:outline-none focus:ring-4 focus:ring-[#A8FF00]/20 transition-all placeholder-gray-500 text-lg"
                            placeholder="Juan Pérez"
                          />
                        </div>
                      </div>

                      {/* Teléfono */}
                      <div>
                        <label className="block text-white font-bold text-lg mb-3">
                          Teléfono
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-600 bg-[#1A1A1A]/80 backdrop-blur-sm text-white focus:border-[#A8FF00] focus:bg-[#1A1A1A] focus:outline-none focus:ring-4 focus:ring-[#A8FF00]/20 transition-all placeholder-gray-500 text-lg"
                            placeholder="600 123 456"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-white font-bold text-lg mb-3">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-600 bg-[#1A1A1A]/80 backdrop-blur-sm text-white focus:border-[#A8FF00] focus:bg-[#1A1A1A] focus:outline-none focus:ring-4 focus:ring-[#A8FF00]/20 transition-all placeholder-gray-500 text-lg"
                            placeholder="juan@email.com"
                          />
                        </div>
                      </div>

                      {/* Código Postal */}
                      <div>
                        <label className="block text-white font-bold text-lg mb-3">
                          Código Postal
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.codigo_postal}
                            onChange={(e) => setFormData({ ...formData, codigo_postal: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-600 bg-[#1A1A1A]/80 backdrop-blur-sm text-white focus:border-[#A8FF00] focus:bg-[#1A1A1A] focus:outline-none focus:ring-4 focus:ring-[#A8FF00]/20 transition-all placeholder-gray-500 text-lg"
                            placeholder="28001"
                          />
                        </div>
                      </div>

                      {/* CUPS (opcional) */}
                      <div>
                        <label className="block text-white font-bold text-lg mb-3">
                          CUPS <span className="text-gray-500 text-sm font-normal">(Opcional)</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.cups}
                            onChange={(e) => setFormData({ ...formData, cups: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-600 bg-[#1A1A1A]/80 backdrop-blur-sm text-white focus:border-[#A8FF00] focus:bg-[#1A1A1A] focus:outline-none focus:ring-4 focus:ring-[#A8FF00]/20 transition-all placeholder-gray-500 text-lg"
                            placeholder="ES0021000000000000AA"
                          />
                          <p className="text-gray-500 text-xs mt-2">Lo encontrarás en tu factura</p>
                        </div>
                      </div>

                      {/* Upload de factura mejorado */}
                      <div>
                        <label className="block text-white font-bold text-lg mb-3">
                          Adjunta tu factura
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            required
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className={`group relative flex items-center justify-center w-full px-6 py-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                              file
                                ? 'border-[#A8FF00] bg-[#A8FF00]/10'
                                : 'border-gray-600 hover:border-[#A8FF00] bg-[#1A1A1A]/50 hover:bg-[#A8FF00]/5'
                            }`}
                          >
                            {file ? (
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#A8FF00]/20 flex items-center justify-center">
                                  <CheckCircle className="w-8 h-8 text-[#A8FF00]" />
                                </div>
                                <div className="text-left">
                                  <p className="text-white font-bold text-lg">{file.name}</p>
                                  <p className="text-[#A8FF00] text-sm">Archivo listo para enviar</p>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center">
                                <div className="w-16 h-16 rounded-2xl bg-[#A8FF00]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#A8FF00]/20 transition-colors">
                                  <Upload className="w-8 h-8 text-[#A8FF00] group-hover:scale-110 transition-transform" />
                                </div>
                                <p className="text-white font-bold text-lg mb-1">
                                  Arrastra tu factura o haz clic aquí
                                </p>
                                <p className="text-gray-400 text-sm">
                                  PDF, JPG o PNG · Máx. 10MB
                                </p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      {/* Error message */}
                      {error && (
                        <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4">
                          <p className="text-red-400 text-sm">{error}</p>
                        </div>
                      )}

                      {/* Botón de envío mejorado */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full bg-gradient-to-r from-[#A8FF00] to-[#96E600] text-[#1A1A1A] px-8 py-5 rounded-2xl text-xl font-black hover:shadow-2xl hover:shadow-[#A8FF00]/60 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden mt-8"
                      >
                        <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-3 relative z-10">
                            <div className="w-6 h-6 border-3 border-[#1A1A1A] border-t-transparent rounded-full animate-spin"></div>
                            Enviando tu factura...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-3 relative z-10">
                            <Zap className="w-6 h-6" />
                            Analizar mi factura gratis
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </button>

                      {/* Footer del formulario */}
                      <p className="text-center text-gray-400 text-sm mt-4">
                        Al enviar, aceptas que revisemos tu factura. No spam, lo prometemos.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nuestro Equipo de Asesores */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              Conoce a <span className="text-[#A8FF00]">nuestros asesores energéticos</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Profesionales certificados que te ayudarán sin coste a maximizar tu ahorro
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
            {[
              { name: 'José Galero', role: 'Asesor Senior', emoji: '👨‍💼' },
              { name: 'Franco Tenaglia', role: 'Director Comercial', emoji: '👔' },
              { name: 'Carlos Martín', role: 'Especialista en Ahorro', emoji: '💡' },
              { name: 'Ana Rodríguez', role: 'Asesora Energética', emoji: '⚡' },
              { name: 'David López', role: 'Analista de Tarifas', emoji: '📊' },
              { name: 'Laura García', role: 'Consultora Senior', emoji: '🎯' },
              { name: 'Miguel Sánchez', role: 'Asesor Técnico', emoji: '🔧' },
              { name: 'Paula Jiménez', role: 'Especialista PYME', emoji: '🏢' }
            ].map((asesor, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-2xl p-6 border-2 border-[#A8FF00]/20 hover:border-[#A8FF00] transition-all duration-300 text-center hover:scale-105"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{asesor.emoji}</div>
                <h4 className="text-white font-black text-lg mb-1">{asesor.name}</h4>
                <p className="text-[#A8FF00] text-sm font-semibold">{asesor.role}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Más de <span className="text-[#A8FF00] font-bold">15 profesionales certificados</span> listos para analizar tu factura y encontrar el mejor ahorro para ti
            </p>
          </div>
        </div>

        {/* Testimonios Premium */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#A8FF00]/20 to-[#96E600]/20 border border-[#A8FF00]/40 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
              <Star className="w-6 h-6 text-[#A8FF00] fill-[#A8FF00]" />
              <span className="text-[#A8FF00] font-black text-lg">+10.000 clientes satisfechos</span>
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
                  Solo con una llamada en 24 horas, ya pude ahorrar <span className="text-[#A8FF00] font-bold">320€ al año</span>. Increíble lo fácil que fue.
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
                  <p className="text-[#1A1A1A] font-black text-sm">320€/año</p>
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
                  En 24 horas me llamaron con un análisis completo. Ahora mi empresa ahorra <span className="text-[#A8FF00] font-bold">9.600€ al año</span>.
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
                  <p className="text-[#1A1A1A] font-black text-sm">9.600€/año</p>
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
                  Me llamaron en menos de un día y ahora ahorro <span className="text-[#A8FF00] font-bold">280€ al año</span>. Proceso súper rápido y sin complicaciones.
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
                  <p className="text-[#1A1A1A] font-black text-sm">280€/año</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-12 bg-gradient-to-r from-[#2A2A2A] via-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-8 border border-[#A8FF00]/30">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-black text-[#A8FF00] mb-2">10K+</p>
                <p className="text-gray-400 font-semibold">Clientes satisfechos</p>
              </div>
              <div>
                <p className="text-4xl font-black text-[#A8FF00] mb-2">320€</p>
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
              Nos encontramos en <span className="text-[#A8FF00]">España</span>
            </h3>
            <p className="text-xl text-gray-400">Con oficinas físicas y un equipo real a tu disposición</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#1A1A1A]/50 rounded-2xl p-8 border border-[#A8FF00]/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#A8FF00]/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <h4 className="text-[#A8FF00] font-black text-2xl">Oficina Principal</h4>
              </div>
              <p className="text-white font-semibold text-lg mb-2">Madrid, España</p>
              <p className="text-gray-400">Calle Gran Vía 123, 28013</p>
              <p className="text-gray-400 mt-4">📞 900 123 456</p>
              <p className="text-gray-400">📧 info@wasabi-energy.com</p>
            </div>

            <div className="bg-[#1A1A1A]/50 rounded-2xl p-8 border border-[#A8FF00]/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#A8FF00]/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏢</span>
                </div>
                <h4 className="text-[#A8FF00] font-black text-2xl">Horario</h4>
              </div>
              <p className="text-white font-semibold text-lg mb-2">Lunes a Viernes</p>
              <p className="text-gray-400 mb-4">9:00 - 19:00h</p>
              <p className="text-white font-semibold text-lg mb-2">Sábados</p>
              <p className="text-gray-400">10:00 - 14:00h</p>
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
              href="#formulario"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#A8FF00] to-[#96E600] text-[#1A1A1A] px-12 py-6 rounded-full text-2xl font-black hover:shadow-2xl hover:shadow-[#A8FF00]/50 transition-all duration-300 transform hover:scale-110 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <Upload className="w-7 h-7 relative z-10" />
              <span className="relative z-10">Subir mi factura ahora</span>
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
    </div>
  );
}
