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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Factura recibida con éxito!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Nuestro equipo está analizando tu factura en este momento.<br />
            Te llamaremos en menos de 24 horas solo si podemos mejorar tu tarifa.
          </p>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              ¿Qué ocurre ahora?
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-600 font-semibold">1</span>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Análisis detallado</p>
                  <p className="text-gray-600 text-sm">Revisamos tu contrato actual y comparamos con las mejores opciones del mercado</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-600 font-semibold">2</span>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Identificamos ahorros</p>
                  <p className="text-gray-600 text-sm">Calculamos exactamente cuánto puedes ahorrar al mes y al año</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-600 font-semibold">3</span>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Te contactamos</p>
                  <p className="text-gray-600 text-sm">Si encontramos una mejora, te llamamos. Si no, no te molestamos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            ¿Estás pagando de más en tu<br />factura de luz?
          </h1>
          <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Descúbrelo en menos de 24 horas. Sube tu factura y recibe un estudio gratuito sin compromiso.
          </p>
          <a
            href="#formulario"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Subir mi factura ahora
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Validación del problema */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            La realidad que nadie te cuenta
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-gray-700 font-medium mb-2">
                Es posible que estés pagando más que otros consumiendo menos
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-gray-700 font-medium mb-2">
                Es posible que no entiendas tu factura y estés pagando conceptos innecesarios
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-gray-700 font-medium mb-2">
                Es posible que estés en una tarifa antigua sin saberlo
              </p>
            </div>
          </div>
        </div>

        {/* Cómo funciona */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Cómo funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full border-2 border-emerald-200">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Subes tu factura
                </h3>
                <p className="text-gray-600 text-lg">
                  Rellena el formulario y adjunta tu última factura de luz. Tarda menos de 2 minutos.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full border-2 border-emerald-200">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Analizamos tu contrato
                </h3>
                <p className="text-gray-600 text-lg">
                  Nuestro equipo revisa cada detalle y compara con las mejores opciones del mercado.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full border-2 border-emerald-200">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Te llamamos solo si podemos mejorarlo
                </h3>
                <p className="text-gray-600 text-lg">
                  Si no hay mejora, no te molestamos. Así de simple.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div id="formulario" className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-gray-100 scroll-mt-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Sube tu factura ahora
          </h2>
          <p className="text-xl text-gray-600 mb-8 text-center">
            Análisis gratuito y sin compromiso
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Tipo de cliente
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoCliente: 'particular' })}
                    className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                      formData.tipoCliente === 'particular'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    Particular
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoCliente: 'empresa' })}
                    className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                      formData.tipoCliente === 'empresa'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    Empresa
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Tu teléfono"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
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
                    className="flex items-center justify-center w-full px-4 py-8 rounded-xl border-2 border-dashed border-gray-300 hover:border-emerald-500 cursor-pointer transition-all bg-gray-50 hover:bg-emerald-50"
                  >
                    {file ? (
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                        <span className="text-gray-700 font-medium">{file.name}</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 font-medium">
                          Haz clic para subir tu factura
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
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
                className="w-full bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl shadow-2xl p-8 md:p-12 mb-16 text-white">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-300 text-xl">★</span>
                ))}
              </div>
              <p className="text-white/90 mb-4 italic">
                "Ahorro 45€ al mes sin hacer nada. Solo subí mi factura y ellos se encargaron de todo."
              </p>
              <p className="text-white font-semibold">
                María González - Particular
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-300 text-xl">★</span>
                ))}
              </div>
              <p className="text-white/90 mb-4 italic">
                "En mi empresa estábamos pagando casi el doble. Ahora ahorramos más de 800€ al mes."
              </p>
              <p className="text-white font-semibold">
                Carlos Martín - Empresa
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-300 text-xl">★</span>
                ))}
              </div>
              <p className="text-white/90 mb-4 italic">
                "Lo mejor es la tranquilidad. Sé que mi factura está optimizada y no pago de más."
              </p>
              <p className="text-white font-semibold">
                Ana López - Particular
              </p>
            </div>
          </div>
        </div>

        {/* Oportunidad actual */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            El mejor momento es ahora
          </h2>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-6">
            El mercado energético está en constante cambio. Cuando los precios están favorables, es cuando debes actuar.
            El mejor momento para revisar tu contrato no es cuando vuelve a subir.
          </p>
          <p className="text-2xl font-bold text-emerald-600 text-center">
            Es ahora.
          </p>
        </div>

        {/* Cierre final */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Sube tu factura y sal de dudas hoy mismo
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Sin compromiso. Sin letra pequeña. Solo te llamamos si podemos ayudarte.
          </p>
          <a
            href="#formulario"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Upload className="w-5 h-5" />
            Subir mi factura ahora
          </a>
        </div>

        {/* Garantía de confianza */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <Phone className="w-8 h-8 text-emerald-500" />
            <div className="text-left">
              <p className="font-semibold text-gray-900">
                Llevamos años analizando facturas energéticas
              </p>
              <p className="text-gray-600">
                Sabemos dónde están los errores y cómo optimizar cada contrato
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
