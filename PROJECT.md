# Employee QR Track - Proje Yönergeleri

## 📋 İçindekiler
1. [Proje Yapısı](#proje-yapısı)
2. [Dosya ve Klasör Organizasyonu](#dosya-ve-klasör-organizasyonu)
3. [Routing Yapısı](#routing-yapısı)
4. [Component Kullanımı](#component-kullanımı)
5. [State Management & Data Fetching](#state-management--data-fetching)
6. [Form Yönetimi](#form-yönetimi)
7. [Tablo Yönetimi](#tablo-yönetimi)
8. [Stil ve CSS Kuralları](#stil-ve-css-kuralları)
9. [UI/UX Prensipleri](#uiux-prensipleri)
10. [Kod Kalitesi ve Best Practices](#kod-kalitesi-ve-best-practices)
11. [Dashboard ve Landing Page Kuralları](#dashboard-ve-landing-page-kuralları)

---

## 🏗️ Proje Yapısı

```
src/
├── components/           # Yeniden kullanılabilir UI componentleri
│   └── ui/              # shadcn/ui component library (47 adet)
├── features/            # Özellik bazlı modüller (her feature kendi içinde bağımsız)
│   ├── home-page/
│   ├── dashboard/
│   ├── auth/
│   └── [feature-name]/
│       ├── index.tsx         # Ana component
│       ├── components/       # Feature'a özel componentler
│       ├── hooks/           # Feature'a özel hooks
│       ├── api/             # API çağrıları (queries & mutations)
│       ├── types.ts         # TypeScript tipleri
│       └── styles.css       # Feature'a özel stiller (gerekirse)
├── routes/              # TanStack Router file-based routing
├── hooks/               # Global custom hooks
├── lib/                 # Utility fonksiyonlar
├── integrations/        # Üçüncü parti entegrasyonlar
│   └── tanstack-query/
└── styles.css          # Global CSS stilleri

```

---

## 📁 Dosya ve Klasör Organizasyonu

### Feature-Based Architecture
Her özellik kendi klasöründe bağımsız olmalı:

```typescript
// ✅ Doğru: Feature-based organizasyon
features/
  employee-management/
    index.tsx              // Ana component export
    EmployeeList.tsx       // Liste görünümü
    EmployeeForm.tsx       // Form component
    components/
      EmployeeCard.tsx     // Özel card component
    hooks/
      useEmployees.ts      // Data fetching hook
    api/
      queries.ts           // TanStack Query queries
      mutations.ts         // TanStack Query mutations
    types.ts               // TypeScript interfaces

// ❌ Yanlış: Tüm componentleri tek yerde toplamak
components/
  EmployeeList.tsx
  EmployeeForm.tsx
  EmployeeCard.tsx
  UserList.tsx
  UserForm.tsx
```

---

## 🛣️ Routing Yapısı

### TanStack Router File-Based Routing
Routes klasörü sadece routing tanımlarını içermeli, iş mantığı features klasöründe olmalı.

```typescript
// src/routes/dashboard/employees.tsx
import { createFileRoute } from '@tanstack/react-router'
import { EmployeeManagement } from '@/features/employee-management'

export const Route = createFileRoute('/dashboard/employees')({
  component: EmployeeManagement,
})

// src/features/employee-management/index.tsx
export function EmployeeManagement() {
  // Component logic burada
}
```

### Route Yapısı Örneği
```
routes/
  __root.tsx              # Root layout
  index.tsx               # Landing page (/)
  dashboard/
    index.tsx             # Dashboard ana sayfa (/dashboard)
    employees.tsx         # (/dashboard/employees)
    settings.tsx          # (/dashboard/settings)
  auth/
    login.tsx             # (/auth/login)
    register.tsx          # (/auth/register)
```

---

## 🧩 Component Kullanımı

### 1. UI Component Library (shadcn/ui)
**47 hazır component mevcut - MUTLAKA kullanılmalı!**

#### Kullanılabilir Componentler:
- **Layout**: `Card`, `Separator`, `Tabs`, `Accordion`, `Collapsible`, `Resizable`, `Sidebar`
- **Form**: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio Group`, `Switch`, `Calendar`, `Input OTP`, `Form`, `Field`, `Input Group`
- **Data Display**: `Table`, `Badge`, `Avatar`, `Empty`, `Skeleton`, `Progress`, `Chart`
- **Feedback**: `Alert`, `Alert Dialog`, `Dialog`, `Drawer`, `Toast (Sonner)`, `Tooltip`, `Popover`, `Hover Card`, `Spinner`
- **Navigation**: `Breadcrumb`, `Navigation Menu`, `Menubar`, `Dropdown Menu`, `Context Menu`, `Pagination`, `Sidebar`
- **Buttons**: `Button`, `Button Group`, `Toggle`, `Toggle Group`
- **Others**: `Scroll Area`, `Sheet`, `Command`, `Carousel`, `Kbd`, `Aspect Ratio`

#### ⚠️ ÖNEMLİ KURALLAR:

```typescript
// ✅ DOĞRU: UI componentlerini kullan
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function EmployeeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Çalışan Bilgileri</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Kaydet</Button>
      </CardContent>
    </Card>
  )
}

// ❌ YANLIŞ: Kendi button'unu oluşturma
function EmployeeCard() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold">Çalışan Bilgileri</h3>
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Kaydet
      </button>
    </div>
  )
}
```

### 2. Component Composition

```typescript
// ✅ Küçük, tek sorumluluk prensibi
function EmployeeAvatar({ name, image }: Props) {
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}

// ✅ Compose ederek kullan
function EmployeeCard({ employee }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <EmployeeAvatar name={employee.name} image={employee.image} />
        <div>
          <CardTitle>{employee.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{employee.role}</p>
        </div>
      </CardHeader>
    </Card>
  )
}
```

---

## 🔄 State Management & Data Fetching

### TanStack Query (React Query) Kullanımı

#### Queries (Veri Çekme)
```typescript
// src/features/employees/api/queries.ts
import { queryOptions, useQuery } from '@tanstack/react-query'

export const employeeQueries = {
  all: () => ['employees'] as const,
  lists: () => [...employeeQueries.all(), 'list'] as const,
  list: (filters: EmployeeFilters) =>
    queryOptions({
      queryKey: [...employeeQueries.lists(), filters],
      queryFn: () => fetchEmployees(filters),
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: [...employeeQueries.all(), 'detail', id],
      queryFn: () => fetchEmployeeById(id),
    }),
}

// Hook olarak kullan
export function useEmployees(filters: EmployeeFilters) {
  return useQuery(employeeQueries.list(filters))
}

export function useEmployee(id: string) {
  return useQuery(employeeQueries.detail(id))
}
```

#### Mutations (Veri Güncelleme)
```typescript
// src/features/employees/api/mutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { employeeQueries } from './queries'

export function useCreateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (employee: CreateEmployeeInput) => createEmployee(employee),
    onSuccess: () => {
      // Cache'i invalidate et
      queryClient.invalidateQueries({ queryKey: employeeQueries.lists() })
    },
  })
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEmployeeInput }) =>
      updateEmployee(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: employeeQueries.detail(id) })
      queryClient.invalidateQueries({ queryKey: employeeQueries.lists() })
    },
  })
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeQueries.lists() })
    },
  })
}
```

#### Component'te Kullanım
```typescript
import { useEmployees, useCreateEmployee } from './api/queries'

function EmployeeList() {
  const { data: employees, isLoading } = useEmployees({ status: 'active' })
  const createEmployee = useCreateEmployee()

  const handleCreate = async (data: CreateEmployeeInput) => {
    await createEmployee.mutateAsync(data)
    toast.success('Çalışan oluşturuldu')
  }

  if (isLoading) return <Spinner />

  return (
    <div>
      {employees?.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  )
}
```

---

## 📝 Form Yönetimi

### React Hook Form + Zod ile Form Validation

```typescript
// src/features/employees/components/EmployeeForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const employeeSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir email adresi girin'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Geçerli bir telefon numarası girin'),
  role: z.enum(['admin', 'user', 'manager']),
})

type EmployeeFormValues = z.infer<typeof employeeSchema>

export function EmployeeForm({ onSubmit }: Props) {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: 'user',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İsim</FormLabel>
              <FormControl>
                <Input placeholder="Ahmet Yılmaz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-posta</FormLabel>
              <FormControl>
                <Input type="email" placeholder="ahmet@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </form>
    </Form>
  )
}
```

---

## 📊 Tablo Yönetimi

### TanStack Table (React Table) Kullanımı

```typescript
// src/features/employees/components/EmployeeTable.tsx
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Employee = {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'name',
    header: 'İsim',
  },
  {
    accessorKey: 'email',
    header: 'E-posta',
  },
  {
    accessorKey: 'role',
    header: 'Rol',
  },
  {
    accessorKey: 'status',
    header: 'Durum',
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'active' ? 'success' : 'secondary'}>
        {row.original.status === 'active' ? 'Aktif' : 'Pasif'}
      </Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">Aksiyon</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Düzenle</DropdownMenuItem>
          <DropdownMenuItem>Sil</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export function EmployeeTable({ data }: { data: Employee[] }) {
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <div className="space-y-4">
      <Input
        placeholder="Ara..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} kayıt
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Önceki
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Sonraki
          </Button>
        </div>
      </div>
    </div>
  )
}
```

---

## 🎨 Stil ve CSS Kuralları

### CSS Hiyerarşisi
1. **Global CSS** (`src/styles.css`) - Tüm proje genelinde geçerli
2. **Component Styles** - Tailwind CSS classes (inline)
3. **Feature-Specific CSS** - Sadece gerektiğinde (`features/[name]/styles.css`)

### Global CSS (src/styles.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    /* ... diğer CSS variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode variables */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Tailwind CSS Kullanımı - ÖNEMLİ KURALLAR

```typescript
// ✅ DOĞRU: Tailwind utility classes kullan
<div className="flex items-center justify-between p-4 rounded-lg border bg-card">
  <h2 className="text-2xl font-bold">Başlık</h2>
</div>

// ✅ DOĞRU: Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>

// ✅ DOĞRU: cn() utility ile conditional classes
import { cn } from '@/lib/utils'

<Button 
  className={cn(
    "w-full",
    isLoading && "opacity-50 cursor-not-allowed"
  )}
>
  Gönder
</Button>

// ❌ YANLIŞ: Inline styles kullanma
<div style={{ display: 'flex', padding: '16px' }}>
  <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Başlık</h2>
</div>

// ❌ YANLIŞ: Tekrarlayan class'ları her yerde yazma
// Bunun yerine component oluştur
```

### Responsive Design Breakpoints
```typescript
// Tailwind default breakpoints:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px

// ✅ Mobile-first approach
<div className="
  w-full              // Mobile
  md:w-1/2           // Tablet
  lg:w-1/3           // Desktop
  px-4 md:px-6 lg:px-8
">
  İçerik
</div>
```

### Feature-Specific CSS (Sadece Gerektiğinde)
```css
/* src/features/dashboard/styles.css */
/* Sadece çok spesifik ve tekrar kullanılmayacak stiller için */

.dashboard-grid-animation {
  animation: fadeInUp 0.3s ease-in-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 🎯 UI/UX Prensipleri

### 1. Responsive Design
```typescript
// Her component mobil öncelikli olmalı
function EmployeeCard() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-lg sm:text-xl md:text-2xl">
          Çalışan Detayları
        </CardTitle>
        <Button size="sm" className="mt-2 sm:mt-0">
          Düzenle
        </Button>
      </CardHeader>
    </Card>
  )
}
```

### 2. Loading States
```typescript
// Kullanıcıya her zaman feedback ver
function EmployeeList() {
  const { data, isLoading, error } = useEmployees()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2 mt-2" />
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Hata</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  )
}
```

### 3. Empty States
```typescript
// Boş durumlarda kullanıcıyı yönlendir
function EmployeeList() {
  const { data } = useEmployees()

  if (!data || data.length === 0) {
    return (
      <Empty
        title="Henüz çalışan yok"
        description="Yeni bir çalışan ekleyerek başlayın"
        action={
          <Button onClick={() => navigate('/employees/new')}>
            Çalışan Ekle
          </Button>
        }
      />
    )
  }

  return <EmployeeGrid data={data} />
}
```

### 4. Error Handling ve Toast Notifications
```typescript
import { toast } from 'sonner'

function EmployeeForm() {
  const createEmployee = useCreateEmployee()

  const handleSubmit = async (data: FormData) => {
    try {
      await createEmployee.mutateAsync(data)
      toast.success('Çalışan başarıyla oluşturuldu')
      navigate('/employees')
    } catch (error) {
      toast.error('Bir hata oluştu', {
        description: error.message,
      })
    }
  }

  return <Form onSubmit={handleSubmit} />
}
```

### 5. Accessibility (Erişilebilirlik)
```typescript
// ARIA labels, keyboard navigation, focus management
<Button
  aria-label="Çalışanı sil"
  onClick={handleDelete}
  disabled={isDeleting}
>
  {isDeleting ? <Spinner className="mr-2" /> : <Trash2 className="mr-2" />}
  Sil
</Button>

// Form elementlerinde label kullan
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>E-posta</FormLabel>
      <FormControl>
        <Input {...field} type="email" aria-describedby="email-error" />
      </FormControl>
      <FormMessage id="email-error" />
    </FormItem>
  )}
/>
```

### 6. Consistent Spacing
```typescript
// Tutarlı spacing kullan: 4, 8, 12, 16, 24, 32px (1, 2, 3, 4, 6, 8)
<div className="space-y-6">           {/* Sections arası */}
  <Card className="p-6">              {/* Card padding */}
    <CardHeader className="space-y-2"> {/* Header içi */}
      <CardTitle>Başlık</CardTitle>
      <CardDescription>Açıklama</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4"> {/* Content içi */}
      <div className="flex items-center gap-4"> {/* Yan yana elemanlar */}
        <Avatar />
        <div>İsim</div>
      </div>
    </CardContent>
  </Card>
</div>
```

---

## ✨ Kod Kalitesi ve Best Practices

### 1. TypeScript Kullanımı
```typescript
// ✅ Her zaman type tanımla
interface Employee {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'manager'
  status: 'active' | 'inactive'
  createdAt: Date
}

type CreateEmployeeInput = Omit<Employee, 'id' | 'createdAt'>

// ✅ Props için interface kullan
interface EmployeeCardProps {
  employee: Employee
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

// ❌ any kullanma
function updateEmployee(data: any) { } // YANLIŞ

// ✅ Proper typing
function updateEmployee(data: UpdateEmployeeInput) { }
```

### 2. Component Yapısı
```typescript
// ✅ Küçük, single-responsibility components
// Bir component max 150-200 satır olmalı

// EmployeeList.tsx
export function EmployeeList() {
  const { data, isLoading } = useEmployees()
  
  if (isLoading) return <EmployeeListSkeleton />
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  )
}

// EmployeeCard.tsx (ayrı dosya)
export function EmployeeCard({ employee }: Props) {
  return (
    <Card>
      <CardHeader>
        <EmployeeAvatar {...employee} />
        <CardTitle>{employee.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <EmployeeDetails {...employee} />
      </CardContent>
      <CardFooter>
        <EmployeeActions {...employee} />
      </CardFooter>
    </Card>
  )
}
```

### 3. Custom Hooks
```typescript
// ✅ Tekrar eden logic'i hook'a çevir
export function useEmployeeActions() {
  const createEmployee = useCreateEmployee()
  const updateEmployee = useUpdateEmployee()
  const deleteEmployee = useDeleteEmployee()

  const handleCreate = useCallback(async (data: CreateEmployeeInput) => {
    try {
      await createEmployee.mutateAsync(data)
      toast.success('Çalışan oluşturuldu')
      return true
    } catch (error) {
      toast.error('Hata oluştu')
      return false
    }
  }, [createEmployee])

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isLoading: createEmployee.isPending || updateEmployee.isPending,
  }
}
```

### 4. Error Boundaries
```typescript
// src/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error?: Error }
> {
  state = { hasError: false, error: undefined }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Alert variant="destructive" className="max-w-md">
            <AlertTitle>Bir hata oluştu</AlertTitle>
            <AlertDescription>{this.state.error?.message}</AlertDescription>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Sayfayı Yenile
            </Button>
          </Alert>
        </div>
      )
    }

    return this.props.children
  }
}
```

### 5. File Naming Conventions
```
✅ PascalCase for components: EmployeeCard.tsx
✅ camelCase for utilities: formatDate.ts
✅ kebab-case for CSS: employee-card.css
✅ UPPER_CASE for constants: API_BASE_URL

features/
  employee-management/
    EmployeeList.tsx         ✅ Component
    EmployeeCard.tsx         ✅ Component
    useEmployees.ts          ✅ Hook
    employeeService.ts       ✅ Service
    types.ts                 ✅ Types
    constants.ts             ✅ Constants
```

---

## 🚀 Dashboard ve Landing Page Kuralları

### Dashboard Layout Yapısı

```typescript
// src/features/dashboard/DashboardLayout.tsx
import { Sidebar, SidebarContent, SidebarProvider } from '@/components/ui/sidebar'

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto">
          <DashboardHeader />
          <div className="container py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <nav className="space-y-2 p-4">
          <NavLink to="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/employees">
            <Users className="mr-2 h-4 w-4" />
            Çalışanlar
          </NavLink>
          <NavLink to="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" />
            Ayarlar
          </NavLink>
        </nav>
      </SidebarContent>
    </Sidebar>
  )
}
```

### Dashboard Ana Sayfa - KPI Cards

```typescript
// src/features/dashboard/DashboardOverview.tsx
function DashboardOverview() {
  const { data: stats } = useStats()

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Toplam Çalışan
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              +12% geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Aktif Kullanıcı
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              +8% geçen aya göre
            </p>
          </CardContent>
        </Card>

        {/* Diğer KPI kartları... */}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aylık İstatistikler</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={stats?.monthlyData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivityList activities={stats?.recentActivities} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

### Landing Page Yapısı

```typescript
// src/features/landing/LandingPage.tsx
export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="container flex min-h-[calc(100vh-4rem)] items-center py-12 md:py-24">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Employee QR Track
            <span className="block text-primary">Kolay ve Hızlı</span>
          </h1>
          <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
            QR kod ile çalışan takibi yapın. Modern, güvenilir ve kullanımı kolay
            platform.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/auth/register">Hemen Başla</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="#features">Özellikleri İncele</Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <img
            src="/hero-image.png"
            alt="Dashboard Preview"
            className="rounded-lg border shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: QrCode,
      title: 'QR Kod ile Giriş',
      description: 'Hızlı ve güvenli QR kod ile çalışan girişi',
    },
    {
      icon: Clock,
      title: 'Gerçek Zamanlı Takip',
      description: 'Anlık çalışan durumu ve raporlama',
    },
    {
      icon: Shield,
      title: 'Güvenli Altyapı',
      description: 'Verileriniz en yüksek güvenlik standartlarında',
    },
  ]

  return (
    <section id="features" className="container py-12 md:py-24">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold md:text-4xl">Öne Çıkan Özellikler</h2>
        <p className="text-muted-foreground md:text-lg">
          İhtiyacınız olan her şey bir arada
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
```

### SAAS Dashboard Best Practices

#### 1. **Consistent Navigation**
```typescript
// Sidebar navigation her zaman görünür ve tutarlı olmalı
// Mobile'da collapse olabilir
```

#### 2. **Quick Actions**
```typescript
// Her sayfada hızlı erişim butonları
<div className="flex items-center justify-between">
  <h1 className="text-3xl font-bold">Çalışanlar</h1>
  <div className="flex gap-2">
    <Button variant="outline">
      <Download className="mr-2 h-4 w-4" />
      Dışa Aktar
    </Button>
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Yeni Çalışan
    </Button>
  </div>
</div>
```

#### 3. **Search and Filters**
```typescript
// Her liste sayfasında arama ve filtreleme
<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <Input
    placeholder="Ara..."
    className="max-w-sm"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <div className="flex gap-2">
    <Select value={status} onValueChange={setStatus}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Durum" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tümü</SelectItem>
        <SelectItem value="active">Aktif</SelectItem>
        <SelectItem value="inactive">Pasif</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>
```

#### 4. **Responsive Tables**
```typescript
// Mobile'da card görünümüne geç
<div className="md:hidden">
  {/* Mobile Card View */}
  {employees.map(employee => (
    <Card key={employee.id} className="mb-4">
      <CardContent className="pt-6">
        <EmployeeCardMobile employee={employee} />
      </CardContent>
    </Card>
  ))}
</div>

<div className="hidden md:block">
  {/* Desktop Table View */}
  <EmployeeTable employees={employees} />
</div>
```

#### 5. **Performance Optimization**
```typescript
// Lazy loading, pagination, virtual scrolling
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

<Suspense fallback={<Spinner />}>
  <HeavyComponent />
</Suspense>
```

---

## 📋 Checklist - Her Yeni Feature İçin

### Başlamadan Önce:
- [ ] Feature klasörü oluşturuldu mu? (`features/[name]/`)
- [ ] TypeScript tipleri tanımlandı mı? (`types.ts`)
- [ ] API queries ve mutations hazırlandı mı? (`api/queries.ts`, `api/mutations.ts`)

### Component Geliştirme:
- [ ] UI componentleri (`components/ui/`) kullanıldı mı?
- [ ] Responsive design (mobile, tablet, desktop) kontrol edildi mi?
- [ ] Loading states var mı?
- [ ] Error handling yapıldı mı?
- [ ] Empty states eklendi mi?
- [ ] Accessibility (ARIA labels) kontrol edildi mi?

### Stil ve CSS:
- [ ] Tailwind CSS kullanıldı mı?
- [ ] Inline style kullanılmadı mı?
- [ ] Tutarlı spacing uygulandı mı?
- [ ] Color scheme (light/dark mode) uyumlu mu?

### Kod Kalitesi:
- [ ] TypeScript hataları yok mu?
- [ ] ESLint uyarıları temizlendi mi?
- [ ] Component 200 satırdan kısa mı?
- [ ] Tek sorumluluk prensibi uygulandı mı?
- [ ] Custom hooks tekrar kullanılabilir mi?

### Test ve Performans:
- [ ] Sayfa hızlı yükleniyor mu?
- [ ] Lazy loading uygulandı mı?
- [ ] Console hataları yok mu?
- [ ] Mobile'da test edildi mi?

---

## 🎓 Öğrenme Kaynakları

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [TanStack Router Docs](https://tanstack.com/router/latest)
- [TanStack Table Docs](https://tanstack.com/table/latest)
- [React Hook Form Docs](https://react-hook-form.com/)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

---

## 📝 Son Notlar

Bu döküman bir **yaşayan dokümandır**. Proje geliştikçe ve yeni best practice'ler öğrendikçe güncellenmelidir.

**Unutma:**
- ✅ Mevcut componentleri kullan
- ✅ Temiz, okunabilir kod yaz
- ✅ Kullanıcı deneyimini önceliklendir
- ✅ Mobile-first yaklaşım
- ✅ Accessibility'yi unutma
- ❌ Aynı kodu tekrar yazma
- ❌ Inline style kullanma
- ❌ Componentleri 200 satırdan uzun tutma

**İyi kodlamalar! 🚀**
