import { useState } from 'react';
import { Upload, CheckCircle, FileText, Phone, TrendingDown, ArrowRight, Zap, Shield, Star } from 'lucide-react';

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

          <p className="text-2xl md:text-3xl text-gray-300 mb-10 max-w-3xl mx-auto relative z-10 font-light">
            Descúbrelo en menos de 24 horas. Sube tu factura y recibe un estudio gratuito sin compromiso.
          </p>

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

        {/* Formulario */}
        <div id="formulario" className="relative bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border-2 border-[#A8FF00]/40 scroll-mt-20 overflow-hidden">
          {/* Efectos de brillo en el fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#A8FF00]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#96E600]/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-[#A8FF00]/20 rounded-2xl mb-4">
                <Upload className="w-10 h-10 text-[#A8FF00]" />
              </div>
              <h2 className="text-5xl font-black text-white mb-4">
                Sube tu <span className="text-[#A8FF00]">factura ahora</span>
              </h2>
              <p className="text-xl text-gray-300">
                Análisis gratuito y sin compromiso
              </p>
            </div>

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
                className="group relative w-full bg-gradient-to-r from-[#A8FF00] to-[#96E600] text-[#1A1A1A] px-8 py-5 rounded-full text-xl font-black hover:shadow-2xl hover:shadow-[#A8FF00]/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2 relative z-10">
                    <div className="w-6 h-6 border-3 border-[#1A1A1A] border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2 relative z-10">
                    <Upload className="w-6 h-6" />
                    Enviar mi factura
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </div>
          </form>
          </div>
        </div>

        {/* Prueba social */}
        <div className="relative bg-gradient-to-br from-[#A8FF00] to-[#96E600] rounded-3xl shadow-2xl p-8 md:p-12 mb-16 text-[#1A1A1A] overflow-hidden">
          {/* Efecto de brillo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#1A1A1A]/10 px-4 py-2 rounded-full mb-4">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="font-bold">+500 clientes satisfechos</span>
              </div>
              <h2 className="text-5xl font-black mb-2">
                Lo que dicen nuestros clientes
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="group bg-[#1A1A1A]/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-[#1A1A1A]/20 transition-all duration-300 border-2 border-[#1A1A1A]/20 hover:border-[#1A1A1A]/40 transform hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-600 text-yellow-600" />
                  ))}
                </div>
                <p className="text-[#1A1A1A] mb-6 text-lg italic leading-relaxed">
                  "Ahorro 45€ al mes sin hacer nada. Solo subí mi factura y ellos se encargaron de todo."
                </p>
                <div className="border-t-2 border-[#1A1A1A]/20 pt-4">
                  <p className="text-[#1A1A1A] font-black text-lg">
                    María González
                  </p>
                  <p className="text-[#1A1A1A]/70 font-semibold">Particular</p>
                </div>
              </div>

              <div className="group bg-[#1A1A1A]/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-[#1A1A1A]/20 transition-all duration-300 border-2 border-[#1A1A1A]/20 hover:border-[#1A1A1A]/40 transform hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-600 text-yellow-600" />
                  ))}
                </div>
                <p className="text-[#1A1A1A] mb-6 text-lg italic leading-relaxed">
                  "En mi empresa estábamos pagando casi el doble. Ahora ahorramos más de 800€ al mes."
                </p>
                <div className="border-t-2 border-[#1A1A1A]/20 pt-4">
                  <p className="text-[#1A1A1A] font-black text-lg">
                    Carlos Martín
                  </p>
                  <p className="text-[#1A1A1A]/70 font-semibold">Empresa</p>
                </div>
              </div>

              <div className="group bg-[#1A1A1A]/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-[#1A1A1A]/20 transition-all duration-300 border-2 border-[#1A1A1A]/20 hover:border-[#1A1A1A]/40 transform hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-600 text-yellow-600" />
                  ))}
                </div>
                <p className="text-[#1A1A1A] mb-6 text-lg italic leading-relaxed">
                  "Lo mejor es la tranquilidad. Sé que mi factura está optimizada y no pago de más."
                </p>
                <div className="border-t-2 border-[#1A1A1A]/20 pt-4">
                  <p className="text-[#1A1A1A] font-black text-lg">
                    Ana López
                  </p>
                  <p className="text-[#1A1A1A]/70 font-semibold">Particular</p>
                </div>
              </div>
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
