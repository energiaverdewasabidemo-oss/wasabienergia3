import { useState } from 'react';
import { Upload, CheckCircle, FileText, Phone, TrendingDown, ArrowRight } from 'lucide-react';

export default function SubirFactura() {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    tipoCliente: 'particular'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
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
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A]">
      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#A8FF00]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#A8FF00]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight relative z-10">
            ¿Estás pagando de más en tu<br />
            <span className="text-[#A8FF00]">factura de luz</span>?
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto relative z-10">
            Descúbrelo en menos de 24 horas. Sube tu factura y recibe un estudio gratuito sin compromiso.
          </p>
          <a
            href="#formulario"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#A8FF00] to-[#96E600] text-[#1A1A1A] px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg hover:shadow-[#A8FF00]/30 transition-all duration-300 transform hover:scale-105 relative z-10"
          >
            Subir mi factura ahora
            <ArrowRight className="w-5 h-5" />
          </a>
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

        {/* Cómo funciona */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Cómo <span className="text-[#A8FF00]">funciona</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-2xl shadow-lg p-8 h-full border-2 border-[#A8FF00]/30 hover:border-[#A8FF00]/60 transition-all duration-300 hover:shadow-[#A8FF00]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#A8FF00] to-[#96E600] rounded-full flex items-center justify-center mb-6">
                  <span className="text-[#1A1A1A] text-2xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Subes tu factura
                </h3>
                <p className="text-gray-300 text-lg">
                  Rellena el formulario y adjunta tu última factura de luz. Tarda menos de 2 minutos.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-2xl shadow-lg p-8 h-full border-2 border-[#A8FF00]/30 hover:border-[#A8FF00]/60 transition-all duration-300 hover:shadow-[#A8FF00]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#A8FF00] to-[#96E600] rounded-full flex items-center justify-center mb-6">
                  <span className="text-[#1A1A1A] text-2xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Analizamos tu contrato
                </h3>
                <p className="text-gray-300 text-lg">
                  Nuestro equipo revisa cada detalle y compara con las mejores opciones del mercado.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-2xl shadow-lg p-8 h-full border-2 border-[#A8FF00]/30 hover:border-[#A8FF00]/60 transition-all duration-300 hover:shadow-[#A8FF00]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#A8FF00] to-[#96E600] rounded-full flex items-center justify-center mb-6">
                  <span className="text-[#1A1A1A] text-2xl font-bold">3</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Te llamamos solo si podemos mejorarlo
                </h3>
                <p className="text-gray-300 text-lg">
                  Si no hay mejora, no te molestamos. Así de simple.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div id="formulario" className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-[#A8FF00]/30 scroll-mt-20">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            Sube tu <span className="text-[#A8FF00]">factura ahora</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 text-center">
            Análisis gratuito y sin compromiso
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Tipo de cliente
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoCliente: 'particular' })}
                    className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                      formData.tipoCliente === 'particular'
                        ? 'border-[#A8FF00] bg-[#A8FF00]/20 text-[#A8FF00]'
                        : 'border-gray-600 hover:border-[#A8FF00]/50 text-gray-300'
                    }`}
                  >
                    Particular
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoCliente: 'empresa' })}
                    className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                      formData.tipoCliente === 'empresa'
                        ? 'border-[#A8FF00] bg-[#A8FF00]/20 text-[#A8FF00]'
                        : 'border-gray-600 hover:border-[#A8FF00]/50 text-gray-300'
                    }`}
                  >
                    Empresa
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-600 bg-[#1A1A1A] text-white focus:border-[#A8FF00] focus:outline-none transition-colors placeholder-gray-500"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-600 bg-[#1A1A1A] text-white focus:border-[#A8FF00] focus:outline-none transition-colors placeholder-gray-500"
                  placeholder="Tu teléfono"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-600 bg-[#1A1A1A] text-white focus:border-[#A8FF00] focus:outline-none transition-colors placeholder-gray-500"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
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
                    className="flex items-center justify-center w-full px-4 py-8 rounded-xl border-2 border-dashed border-gray-600 hover:border-[#A8FF00] cursor-pointer transition-all bg-[#1A1A1A]/50 hover:bg-[#A8FF00]/10"
                  >
                    {file ? (
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-[#A8FF00]" />
                        <span className="text-white font-medium">{file.name}</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-300 font-medium">
                          Haz clic para subir tu factura
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          PDF, JPG o PNG (máx. 10MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#A8FF00] to-[#96E600] text-[#1A1A1A] px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg hover:shadow-[#A8FF00]/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </span>
                ) : (
                  'Enviar mi factura'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Prueba social */}
        <div className="bg-gradient-to-br from-[#A8FF00] to-[#96E600] rounded-3xl shadow-2xl p-8 md:p-12 mb-16 text-[#1A1A1A]">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Lo que dicen nuestros <span className="text-[#1A1A1A]">clientes</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1A1A1A]/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-[#1A1A1A]/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-600 text-xl">★</span>
                ))}
              </div>
              <p className="text-[#1A1A1A] mb-4 italic">
                "Ahorro 45€ al mes sin hacer nada. Solo subí mi factura y ellos se encargaron de todo."
              </p>
              <p className="text-[#1A1A1A] font-bold">
                María González - Particular
              </p>
            </div>
            <div className="bg-[#1A1A1A]/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-[#1A1A1A]/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-600 text-xl">★</span>
                ))}
              </div>
              <p className="text-[#1A1A1A] mb-4 italic">
                "En mi empresa estábamos pagando casi el doble. Ahora ahorramos más de 800€ al mes."
              </p>
              <p className="text-[#1A1A1A] font-bold">
                Carlos Martín - Empresa
              </p>
            </div>
            <div className="bg-[#1A1A1A]/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-[#1A1A1A]/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-600 text-xl">★</span>
                ))}
              </div>
              <p className="text-[#1A1A1A] mb-4 italic">
                "Lo mejor es la tranquilidad. Sé que mi factura está optimizada y no pago de más."
              </p>
              <p className="text-[#1A1A1A] font-bold">
                Ana López - Particular
              </p>
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
        <div className="text-center bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] rounded-3xl p-12 shadow-2xl border border-[#A8FF00]/30">
          <h2 className="text-4xl font-bold text-white mb-6">
            Sube tu factura y <span className="text-[#A8FF00]">sal de dudas</span> hoy mismo
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Sin compromiso. Sin letra pequeña. Solo te llamamos si podemos ayudarte.
          </p>
          <a
            href="#formulario"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#A8FF00] to-[#96E600] text-[#1A1A1A] px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg hover:shadow-[#A8FF00]/30 transition-all duration-300 transform hover:scale-105"
          >
            <Upload className="w-5 h-5" />
            Subir mi factura ahora
          </a>
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
