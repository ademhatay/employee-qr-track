import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  QrCode,
  Clock,
  ChartLineUp,
  ShieldCheck,
  Devices,
  Lightning,
  Buildings,
  Users,
  ArrowRight,
  Check,
  CaretDown,
  SignIn,
  SignOut,
  List,
} from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [demoStep, setDemoStep] = useState<'idle' | 'scanning' | 'success'>('idle')
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly')

  const features = [
    {
      icon: QrCode,
      title: 'QR Kod ile Giriş/Çıkış',
      description: 'Çalışanlar telefonlarıyla QR kodu tarayarak saniyeler içinde giriş/çıkış yapabilir.',
    },
    {
      icon: Clock,
      title: 'Gerçek Zamanlı Takip',
      description: 'Anlık olarak çalışan giriş-çıkışlarını ve çalışma sürelerini takip edin.',
    },
    {
      icon: ChartLineUp,
      title: 'Detaylı Raporlama',
      description: 'Günlük, haftalık ve aylık çalışma raporları ile veriye dayalı kararlar alın.',
    },
    {
      icon: ShieldCheck,
      title: 'Güvenli Altyapı',
      description: 'Her QR kod 30 saniyede yenilenir, güvenlik ihlali riski minimuma iner.',
    },
    {
      icon: Devices,
      title: 'Çoklu Kiosk Desteği',
      description: 'Birden fazla lokasyonda kiosk terminalleri kurarak merkezi yönetim sağlayın.',
    },
    {
      icon: Lightning,
      title: 'Hızlı Kurulum',
      description: '5 dakikada sistemi kurun, hemen kullanmaya başlayın. Karmaşık donanım gerektirmez.',
    },
  ]

  const pricingPlans = [
    {
      name: 'Başlangıç',
      description: 'Küçük ekipler için ideal',
      monthlyPrice: 299,
      yearlyPrice: 249,
      features: [
        '10 çalışana kadar',
        '1 Kiosk terminali',
        'Temel raporlama',
        'Email desteği',
      ],
      highlighted: false,
    },
    {
      name: 'Profesyonel',
      description: 'Büyüyen şirketler için',
      monthlyPrice: 599,
      yearlyPrice: 499,
      features: [
        '50 çalışana kadar',
        '5 Kiosk terminali',
        'Gelişmiş raporlama',
        'Öncelikli destek',
        'API Erişimi',
      ],
      highlighted: true,
    },
    {
      name: 'Kurumsal',
      description: 'Büyük organizasyonlar için',
      monthlyPrice: 1299,
      yearlyPrice: 999,
      features: [
        'Sınırsız çalışan',
        'Sınırsız Kiosk',
        'Özel raporlama',
        '7/24 destek',
        'API Erişimi',
        'Özel entegrasyonlar',
      ],
      highlighted: false,
    },
  ]

  const faqs = [
    {
      question: 'Sistemi kurmak için teknik bilgi gerekiyor mu?',
      answer: 'Hayır, sistemimiz tamamen web tabanlıdır. Herhangi bir tablet veya bilgisayarda tarayıcı üzerinden çalışır. Kurulum sadece 5 dakika sürer.',
    },
    {
      question: 'QR kod güvenliği nasıl sağlanıyor?',
      answer: 'QR kodlar her 30 saniyede otomatik olarak yenilenir. Bu sayede bir kodun kopyalanması veya paylaşılması durumunda bile güvenlik sağlanır.',
    },
    {
      question: 'Çalışanların telefonu olmasa ne olur?',
      answer: 'Alternatif olarak, çalışanlara özel kartlar da tanımlayabilirsiniz. Ayrıca manuel giriş seçeneği de mevcuttur.',
    },
    {
      question: 'Mevcut HR sistemleriyle entegrasyon mümkün mü?',
      answer: 'Evet, API entegrasyonumuz sayesinde popüler HR yazılımlarıyla kolayca entegre olabilirsiniz. Kurumsal planlarda özel entegrasyon desteği de sunuyoruz.',
    },
  ]

  const handleDemoClick = () => {
    setDemoStep('scanning')
    setTimeout(() => setDemoStep('success'), 1500)
    setTimeout(() => setDemoStep('idle'), 4000)
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.08),transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.08),transparent_60%)]" />
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0f1115]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500">
              <QrCode size={20} weight="bold" className="text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Employee QR Track</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">
              Özellikler
            </a>
            <a href="#demo" className="text-sm text-white/60 hover:text-white transition-colors">
              Demo
            </a>
            <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">
              Fiyatlandırma
            </a>
            <a href="#faq" className="text-sm text-white/60 hover:text-white transition-colors">
              SSS
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              className="bg-transparent text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
              onClick={() => window.location.href = '/auth/login'}
            >
              Giriş Yap
            </Button>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25"
              onClick={() => window.location.href = '/auth/register'}
            >
              Ücretsiz Dene
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-xs font-medium text-emerald-200 uppercase tracking-wider">
                  Modern Personel Takip Sistemi
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                <span className="text-white">Personel Takibini </span>
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Kolaylaştırın
                </span>
              </h1>

              <p className="text-lg text-white/60 max-w-xl leading-relaxed">
                QR kod tabanlı giriş-çıkış sistemiyle çalışanlarınızın mesai takibini otomatikleştirin.
                Karmaşık parmak izi okuyuculara veya kartlı sistemlere elveda deyin.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="h-12 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25"
                  onClick={() => window.location.href = '/auth/register'}
                >
                  14 Gün Ücretsiz Dene
                  <ArrowRight size={18} weight="bold" className="ml-2" />
                </Button>
                <Button
                  size="lg"
                  className="h-12 px-6 border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Demo İzle
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#0f1115] bg-gradient-to-br from-slate-600 to-slate-700"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-white/50">500+ şirket güveniyor</p>
                </div>
              </div>
            </div>

            {/* Hero Visual - Kiosk Preview */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full" />
              <div className="relative rounded-3xl border border-white/10 bg-[#0f1115]/80 backdrop-blur-xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <Buildings size={20} weight="duotone" className="text-white/80" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Örnek Şirket A.Ş.</h3>
                        <p className="text-xs text-white/50">Ana Giriş Terminali</p>
                      </div>
                    </div>
                    <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
                      Aktif
                    </Badge>
                  </div>

                  <div className="text-center py-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Salı</p>
                    <p className="text-5xl font-light tracking-tight tabular-nums mt-2">
                      09:23
                      <span className="text-white/30">:</span>
                      <span className="text-white/60">48</span>
                    </p>
                    <p className="text-sm text-white/50 mt-1">24 Aralık 2024</p>
                  </div>

                  <div className="flex justify-center">
                    <div className="rounded-2xl border border-white/10 bg-white p-4 shadow-xl">
                      <QRCodeSVG value="DEMO-QR-CODE-2024" size={160} level="H" />
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
                      <SignIn size={14} weight="duotone" />
                      Giriş
                    </Badge>
                    <Badge className="border-rose-400/30 bg-rose-400/10 text-rose-200">
                      <SignOut size={14} weight="duotone" />
                      Çıkış
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Aktif Şirket' },
              { value: '50K+', label: 'Günlük İşlem' },
              { value: '99.9%', label: 'Çalışma Süresi' },
              { value: '<1s', label: 'İşlem Hızı' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium">
              Özellikler
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              Her Şeyi Düşündük
            </h2>
            <p className="text-white/60 mt-4">
              Personel takibi için ihtiyacınız olan tüm özellikler tek bir platformda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-colors">
                    <feature.icon size={24} weight="duotone" className="text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium">
              Canlı Demo
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-white/60 mt-4">
              Çalışanlarınız 3 basit adımda giriş-çıkış yapabilir.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Steps */}
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'QR Kodu Tarayın',
                  description: 'Çalışan, kiosk terminalindeki QR kodu telefonuyla tarar.',
                  icon: QrCode,
                },
                {
                  step: '02',
                  title: 'İşlem Seçin',
                  description: 'Giriş veya çıkış seçeneğini tek tıkla seçer.',
                  icon: List,
                },
                {
                  step: '03',
                  title: 'Kayıt Tamamlandı',
                  description: 'İşlem otomatik olarak kaydedilir ve raporlanır.',
                  icon: Check,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                    <item.icon size={24} weight="duotone" className="text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-400 font-medium">ADIM {item.step}</span>
                    <h3 className="font-semibold mt-1">{item.title}</h3>
                    <p className="text-sm text-white/50 mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Demo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-3xl rounded-full" />
              <div className="relative rounded-3xl border border-white/10 bg-[#0f1115]/90 backdrop-blur-xl p-8 shadow-2xl">
                {demoStep === 'idle' && (
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mx-auto">
                      <QrCode size={40} weight="duotone" className="text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Demo'yu Deneyin</h3>
                      <p className="text-sm text-white/50 mt-2">
                        Butona tıklayarak QR tarama işlemini simüle edin
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400"
                      onClick={handleDemoClick}
                    >
                      QR Tara
                    </Button>
                  </div>
                )}

                {demoStep === 'scanning' && (
                  <div className="text-center space-y-6">
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mx-auto">
                      <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 animate-ping" />
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                        <QrCode size={40} weight="duotone" className="text-emerald-400 animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Taranıyor...</h3>
                      <p className="text-sm text-white/50 mt-2">QR kod doğrulanıyor</p>
                    </div>
                  </div>
                )}

                {demoStep === 'success' && (
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-500/20 mx-auto">
                      <Check size={40} weight="bold" className="text-emerald-400" />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-4 py-1 text-xs font-medium text-emerald-300 uppercase tracking-wider">
                        Giriş
                      </span>
                      <h3 className="text-2xl font-semibold mt-3">Ahmet Yılmaz</h3>
                      <p className="text-sm text-white/50 mt-2">Hoş geldiniz! İyi çalışmalar.</p>
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs text-white/40">
                      <Clock size={14} />
                      09:23:48
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium">
              Fiyatlandırma
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              Şirketiniz İçin Uygun Plan
            </h2>
            <p className="text-white/60 mt-4">
              14 gün ücretsiz deneme. Kredi kartı gerektirmez.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 p-1 rounded-full border border-white/10 bg-white/5">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedPlan === 'monthly'
                  ? 'bg-white text-black'
                  : 'text-white/60 hover:text-white'
                  }`}
              >
                Aylık
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedPlan === 'yearly'
                  ? 'bg-white text-black'
                  : 'text-white/60 hover:text-white'
                  }`}
              >
                Yıllık
                <span className="ml-2 text-xs text-emerald-500 font-semibold">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl border p-6 transition-all ${plan.highlighted
                  ? 'border-emerald-500/50 bg-gradient-to-b from-emerald-500/10 to-transparent scale-105'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                      En Popüler
                    </Badge>
                  </div>
                )}
                <div className="text-center pb-6 border-b border-white/10">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="text-sm text-white/50 mt-1">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ₺{selectedPlan === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-white/50">/ay</span>
                  </div>
                </div>
                <ul className="space-y-3 py-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <Check size={16} weight="bold" className="text-emerald-400 flex-shrink-0" />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.highlighted
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                >
                  {plan.highlighted ? 'Hemen Başla' : 'Planı Seç'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium">
              SSS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              Sıkça Sorulan Sorular
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-medium">{faq.question}</span>
                  <CaretDown
                    size={20}
                    weight="bold"
                    className={`text-white/50 transition-transform ${activeFaq === index ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/10" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Personel Takibini Modernleştirin
              </h2>
              <p className="text-white/60 mt-4 max-w-xl mx-auto">
                14 gün ücretsiz deneyin, kredi kartı gerektirmez. Dakikalar içinde kurulum yapın.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button
                  size="lg"
                  className="h-12 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25"
                >
                  Ücretsiz Başla
                  <ArrowRight size={18} weight="bold" className="ml-2" />
                </Button>
                <Button
                  size="lg"
                  className="h-12 px-8 border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  Satış Ekibiyle Konuş
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500">
                  <QrCode size={20} weight="bold" className="text-white" />
                </div>
                <span className="text-lg font-semibold tracking-tight">Employee QR Track</span>
              </div>
              <p className="text-sm text-white/40 mt-4 leading-relaxed">
                Modern personel giriş-çıkış takip sistemi. QR kod ile hızlı, güvenli ve kolay.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ürün</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#features" className="hover:text-white transition-colors">Özellikler</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Fiyatlandırma</a></li>
                <li><a href="#demo" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Entegrasyonlar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Şirket</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kariyer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Destek</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Yardım Merkezi</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">SSS</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/30">
              © 2024 Employee QR Track. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-4">
              <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200 text-xs">
                <Users size={12} className="mr-1" />
                500+ Şirket
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
