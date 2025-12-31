import { Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, BarChart3, CheckCircle, Clock, QrCode, Shield, Star, Users } from '@/lib/icons'
import { cn } from '@/lib/utils'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--sketchy-bg-primary)] to-[var(--sketchy-bg-secondary)]">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-texture-adaptive-paper opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 space-y-6">
          <Badge className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--sketchy-accent-blue)] text-black border border-[var(--sketchy-primary)]">
            <CheckCircle className="w-4 h-4" />
            Yeni Surum 2.0
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="block">Calisan Takibi</span>
            <span className="block text-[var(--sketchy-primary)] mt-2">QR Kodla Kolaylastirin</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--sketchy-primary)] max-w-2xl mx-auto">
            Modern, guvenilir ve kullanimi kolay calisan takip sistemi ile isletmenizi yonetin.
            Gercek zamanli raporlama, detayli analizler ve tam entegrasyon.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative">
            {/* Dashboard Card */}
            <Link to="/dashboard" className="flex-1 w-full md:w-auto">
              <Card className="bg-[var(--sketchy-accent-blue)] text-black border-2 border-[var(--sketchy-primary)] shadow-sketchy-lg hover:shadow-sketchy-xl transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-8 h-8" />
                    <QrCode className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">Employee QR Tracking Dashboard</h3>
                  <p className="text-lg opacity-90">Raporlama</p>
                </CardContent>
              </Card>
            </Link>

            {/* Connecting Line */}
            <div className="hidden md:block w-8 h-0.5 bg-[var(--sketchy-primary)] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[var(--sketchy-primary)]"></div>
              </div>
            </div>

            {/* QR Kiosk Card */}
            <Link to="/kiosk" className="flex-1 w-full md:w-auto">
              <Card className="bg-[var(--sketchy-accent-green)] text-black border-2 border-[var(--sketchy-primary)] shadow-sketchy-lg hover:shadow-sketchy-xl transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <QrCode className="w-12 h-12" />
                  <h3 className="text-2xl font-bold">QR Kiosk</h3>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 pt-12">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-[var(--sketchy-primary)] font-medium">4.8/5 (1,200+ degerlendirme)</span>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: QrCode,
      title: 'QR Kod ile Giris',
      description: 'Hizli ve guvenli QR kod ile calisan giris/cikis takibi',
      accent: 'bg-[var(--sketchy-accent-blue)]',
    },
    {
      icon: Clock,
      title: 'Gercek Zamanli Takip',
      description: 'Anlik calisan durumu, calisma suresi ve varlik bilgileri',
      accent: 'bg-[var(--sketchy-accent-green)]',
    },
    {
      icon: Shield,
      title: 'Guvenli Altyapi',
      description: 'Endustri standardi guvenlik ile veri koruma',
      accent: 'bg-[var(--sketchy-accent-purple)]',
    },
    {
      icon: Users,
      title: 'Coklu Kullanici Destegi',
      description: 'Farkli kullanici rolleri ve yetkilendirme',
      accent: 'bg-[var(--sketchy-accent-red)]',
    },
    {
      icon: BarChart3,
      title: 'Detayli Raporlama',
      description: 'Calisan performansi ve isletme analizi',
      accent: 'bg-[var(--sketchy-accent-purple)]',
    },
    {
      icon: CheckCircle,
      title: 'Mobil Uyumlu',
      description: 'Tum cihazlarda sorunsuz calisma',
      accent: 'bg-[var(--sketchy-accent-green)]',
    },
  ]

  return (
    <section className="py-20 bg-[var(--sketchy-bg-secondary)]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Isletmenizi Donusturecek <span className="text-[var(--sketchy-primary)]">One Cikan Ozellikler</span>
          </h2>
          <p className="text-lg text-[var(--sketchy-primary)]">
            Modern calisan takip cozumumuzle is akisinizi optimize edin, verimliligi artirin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 border-[var(--sketchy-primary)] shadow-sketchy-lg overflow-hidden">
              <CardHeader className="pt-6">
                <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center mb-4', feature.accent)}>
                  <feature.icon className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '50K+', label: 'Aktif Kullanici' },
    { value: '1M+', label: 'QR Taranma' },
    { value: '500+', label: 'Memnun Musteri' },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[var(--sketchy-primary)] mb-2">{stat.value}</div>
              <div className="text-lg text-[var(--sketchy-primary)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Ahmet Yilmaz',
      role: 'IT Direktoru',
      company: 'Teknoloji A.S.',
      content:
        'QR kod sistemi sayesinde calisan takibimiz %40 daha hizli hale geldi. Raporlama ozellikleri inanilmaz detayli.',
      avatar: '/avatars/ahmet.jpg',
    },
    {
      name: 'Zeynep Kaya',
      role: 'Insan Kaynaklari Yoneticisi',
      company: 'Perakende Grubu',
      content:
        'Mobil uygulama sayesinde calisanlarimiz her yerden kolayca giris cikis yapabiliyor. Gercekten kullanici dostu bir sistem.',
      avatar: '/avatars/zeynep.jpg',
    },
    {
      name: 'Mehmet Demir',
      role: 'Operasyon Muduru',
      company: 'Lojistik Ltd.',
      content:
        'Kiosk modu sayesinde tesislerimizde calisan takibi artik cok kolay. Sistem entegrasyonu mukemmel calisiyor.',
      avatar: '/avatars/mehmet.jpg',
    },
  ]

  return (
    <section className="py-20 bg-[var(--sketchy-bg-secondary)]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Musterilerimiz <span className="text-[var(--sketchy-primary)]">Ne Diyor?</span>
          </h2>
          <p className="text-lg text-[var(--sketchy-primary)]">
            Isletmenizi donusturen cozumlerimiz hakkinda gercek geri bildirimler
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 border-[var(--sketchy-primary)] shadow-sketchy-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-[var(--sketchy-primary)]"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-[var(--sketchy-primary)]">{testimonial.role}</p>
                    <p className="text-xs text-[var(--sketchy-primary)]">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-[var(--sketchy-primary)] italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '99',
      period: '/ay',
      description: 'Kucuk isletmeler icin ideal',
      features: ['50 kullanici', 'Temel QR takibi', 'Temel raporlama', 'E-posta destegi'],
      popular: false,
    },
    {
      name: 'Professional',
      price: '199',
      period: '/ay',
      description: 'Gelismis isletmeler icin',
      features: [
        '200 kullanici',
        'Gelismis QR takibi',
        'Detayli raporlama',
        'API erisimi',
        'Telefon destegi',
        'Mobil uygulama',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Ozel',
      period: '',
      description: 'Kurumsal cozumler',
      features: [
        'Sinirsiz kullanici',
        'Ozel QR takibi',
        'Gelismis analiz',
        'Entegre API',
        '24/7 destek',
        'Ozel egitim',
        'Ozel entegrasyon',
      ],
      popular: false,
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Esnek <span className="text-[var(--sketchy-primary)]">Fiyatlandirma Planlari</span>
          </h2>
          <p className="text-lg text-[var(--sketchy-primary)]">Isletmenizin buyumesine uygun, olceklenebilir cozumler</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                'border-2 border-[var(--sketchy-primary)] shadow-sketchy-lg overflow-hidden',
                plan.popular && 'border-[var(--sketchy-accent-blue)] relative',
              )}
            >
              {plan.popular && (
                <div className="bg-[var(--sketchy-accent-blue)] text-black text-center py-2 font-bold">EN POPULER</div>
              )}

              <CardHeader className="pt-6">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center my-4">
                  <span className="text-4xl font-bold text-[var(--sketchy-primary)]">₺{plan.price}</span>
                  <span className="text-lg text-[var(--sketchy-primary)] ml-2">{plan.period}</span>
                </div>
                <p className="text-center text-[var(--sketchy-primary)]">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[var(--sketchy-accent-green)]" />
                      <span className="text-[var(--sketchy-primary)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    'w-full btn-organic button-shadow-organic',
                    plan.popular && 'bg-[var(--sketchy-accent-blue)] text-black hover:bg-[var(--sketchy-accent-blue)]',
                  )}
                >
                  {plan.name === 'Enterprise' ? 'Iletisime Gec' : 'Basla'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 bg-[var(--sketchy-bg-secondary)]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Isletmenizi Donusturmeye Hazir misiniz?</h2>
          <p className="text-lg text-[var(--sketchy-primary)] mb-10">
            Binlerce isletme gibi siz de calisan takibinizi modernize edin.
            14 gunluk ucretsiz deneme surumuyle baslayin.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="btn-organic button-shadow-organic text-lg px-8 py-4">
                14 Gun Ucretsiz Deneme <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="border-[var(--sketchy-primary)] text-[var(--sketchy-primary)] text-lg px-8 py-4"
              >
                Demo Talep Et
              </Button>
            </Link>
          </div>

          <p className="text-sm text-[var(--sketchy-primary)] mt-6">Kredi karti gerekmez. Herhangi bir taahhut yok.</p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[var(--sketchy-bg-primary)] text-[var(--sketchy-primary)] py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Employee QR Track</h3>
            <p className="text-sm">Modern calisan takip cozumleri ile isletmenizi yonetin.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Urun</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[var(--sketchy-accent-blue)]">
                  Ozellikler
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--sketchy-accent-blue)]">
                  Fiyatlandirma
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--sketchy-accent-blue)]">
                  Demo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--sketchy-accent-blue)]">
                  Entegrasyonlar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Sirket</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[var(--sketchy-accent-blue)]">
                  Hakkimizda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--sketchy-accent-blue)]">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--sketchy-accent-blue)]">
                  Kariyer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--sketchy-accent-blue)]">
                  Iletisim
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Destek</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[var(--sketchy-accent-blue)]">
                  Yardim Merkezi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--sketchy-accent-blue)]">
                  API Dokumantasyonu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--sketchy-accent-blue)]">
                  Sistem Durumu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--sketchy-accent-blue)]">
                  Gizlilik Politikasi
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Employee QR Track. Tum haklari saklidir.
          </p>

          <div className="flex gap-4">
            <a href="#" className="text-sm hover:text-[var(--sketchy-accent-blue)]">
              Gizlilik
            </a>
            <a href="#" className="text-sm hover:text-[var(--sketchy-accent-blue)]">
              Kullanim Kosullari
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
