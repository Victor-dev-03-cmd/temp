"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Loader2,
  Save,
  Plus,
  Pencil,
  Trash2,
  Globe,
  DollarSign,
  Languages,
  FileJson,
  Download,
  Upload,
  GripVertical,
  Star,
  Copy,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  enabled: boolean
  default: boolean
}

interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
  rate: number
  enabled: boolean
  default: boolean
}

interface Translations {
  [locale: string]: {
    [key: string]: string
  }
}

export default function LocalizationSettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("languages")
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null)
  const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null)
  const [showLanguageDialog, setShowLanguageDialog] = useState(false)
  const [showCurrencyDialog, setShowCurrencyDialog] = useState(false)
  const [showJsonDialog, setShowJsonDialog] = useState(false)
  const [selectedTranslationLocale, setSelectedTranslationLocale] = useState("en")

  const [languages, setLanguages] = useState<Language[]>([
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", enabled: true, default: true },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", enabled: true, default: false },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳", enabled: true, default: false },
    { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳", enabled: true, default: false },
    { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳", enabled: true, default: false },
    { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳", enabled: true, default: false },
    { code: "si", name: "Sinhala", nativeName: "සිංහල", flag: "🇱🇰", enabled: true, default: false },
    { code: "my", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾", enabled: true, default: false },
    { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭", enabled: false, default: false },
    { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩", enabled: false, default: false },
  ])

  const [currencies, setCurrencies] = useState<Currency[]>([
    { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", rate: 1, enabled: true, default: true },
    { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", rate: 83.12, enabled: true, default: false },
    { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs", flag: "🇱🇰", rate: 323.5, enabled: true, default: false },
    { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾", rate: 4.72, enabled: true, default: false },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", rate: 1.34, enabled: true, default: false },
    { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", rate: 0.79, enabled: true, default: false },
    { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", rate: 0.92, enabled: true, default: false },
    { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", rate: 1.53, enabled: true, default: false },
    { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭", rate: 35.5, enabled: false, default: false },
    { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", flag: "🇧🇩", rate: 110.25, enabled: false, default: false },
  ])

  const [translations, setTranslations] = useState<Translations>({
    en: {
      "nav.temples": "Temples",
      "nav.bookTickets": "Book Tickets",
      "nav.shop": "Shop",
      "nav.login": "Login",
      "nav.register": "Register",
      "home.hero.title": "Discover Sacred Temples",
      "home.hero.subtitle": "Book tickets and shop from temples worldwide",
      "common.addToCart": "Add to Cart",
      "common.bookNow": "Book Now",
      "common.viewAll": "View All",
      "common.search": "Search",
      "common.filter": "Filter",
      "common.sort": "Sort",
    },
    hi: {
      "nav.temples": "मंदिर",
      "nav.bookTickets": "टिकट बुक करें",
      "nav.shop": "दुकान",
      "nav.login": "लॉग इन",
      "nav.register": "रजिस्टर",
      "home.hero.title": "पवित्र मंदिरों की खोज करें",
      "home.hero.subtitle": "दुनिया भर के मंदिरों से टिकट बुक करें और खरीदारी करें",
      "common.addToCart": "कार्ट में जोड़ें",
      "common.bookNow": "अभी बुक करें",
      "common.viewAll": "सभी देखें",
      "common.search": "खोजें",
      "common.filter": "फ़िल्टर",
      "common.sort": "क्रमबद्ध करें",
    },
    ta: {
      "nav.temples": "கோவில்கள்",
      "nav.bookTickets": "டிக்கெட் புக்",
      "nav.shop": "கடை",
      "nav.login": "உள்நுழை",
      "nav.register": "பதிவு செய்",
      "home.hero.title": "புனித கோவில்களைக் கண்டறியுங்கள்",
      "home.hero.subtitle": "உலகம் முழுவதும் உள்ள கோவில்களிலிருந்து டிக்கெட் புக் செய்து ஷாப்பிங் செய்யுங்கள்",
      "common.addToCart": "கூடையில் சேர்",
      "common.bookNow": "இப்போது புக் செய்",
      "common.viewAll": "அனைத்தையும் பார்",
      "common.search": "தேடு",
      "common.filter": "வடிகட்டி",
      "common.sort": "வரிசைப்படுத்து",
    },
  })

  const [newLanguage, setNewLanguage] = useState<Language>({
    code: "",
    name: "",
    nativeName: "",
    flag: "",
    enabled: true,
    default: false,
  })

  const [newCurrency, setNewCurrency] = useState<Currency>({
    code: "",
    name: "",
    symbol: "",
    flag: "",
    rate: 1,
    enabled: true,
    default: false,
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      await fetch("/api/localization", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ languages, currencies, translations }),
      })
      toast({
        title: "Settings saved",
        description: "Localization settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const toggleLanguageEnabled = (code: string) => {
    setLanguages((prev) => prev.map((l) => (l.code === code ? { ...l, enabled: !l.enabled } : l)))
  }

  const setDefaultLanguage = (code: string) => {
    setLanguages((prev) => prev.map((l) => ({ ...l, default: l.code === code })))
  }

  const toggleCurrencyEnabled = (code: string) => {
    setCurrencies((prev) => prev.map((c) => (c.code === code ? { ...c, enabled: !c.enabled } : c)))
  }

  const setDefaultCurrency = (code: string) => {
    setCurrencies((prev) => prev.map((c) => ({ ...c, default: c.code === code })))
  }

  const addLanguage = () => {
    if (newLanguage.code && newLanguage.name) {
      setLanguages((prev) => [...prev, newLanguage])
      setNewLanguage({ code: "", name: "", nativeName: "", flag: "", enabled: true, default: false })
      setShowLanguageDialog(false)
      toast({ title: "Language added", description: `${newLanguage.name} has been added.` })
    }
  }

  const updateLanguage = () => {
    if (editingLanguage) {
      setLanguages((prev) => prev.map((l) => (l.code === editingLanguage.code ? editingLanguage : l)))
      setEditingLanguage(null)
      setShowLanguageDialog(false)
      toast({ title: "Language updated", description: `${editingLanguage.name} has been updated.` })
    }
  }

  const deleteLanguage = (code: string) => {
    setLanguages((prev) => prev.filter((l) => l.code !== code))
    toast({ title: "Language deleted", description: "Language has been removed." })
  }

  const addCurrency = () => {
    if (newCurrency.code && newCurrency.name) {
      setCurrencies((prev) => [...prev, newCurrency])
      setNewCurrency({ code: "", name: "", symbol: "", flag: "", rate: 1, enabled: true, default: false })
      setShowCurrencyDialog(false)
      toast({ title: "Currency added", description: `${newCurrency.name} has been added.` })
    }
  }

  const updateCurrency = () => {
    if (editingCurrency) {
      setCurrencies((prev) => prev.map((c) => (c.code === editingCurrency.code ? editingCurrency : c)))
      setEditingCurrency(null)
      setShowCurrencyDialog(false)
      toast({ title: "Currency updated", description: `${editingCurrency.name} has been updated.` })
    }
  }

  const deleteCurrency = (code: string) => {
    setCurrencies((prev) => prev.filter((c) => c.code !== code))
    toast({ title: "Currency deleted", description: "Currency has been removed." })
  }

  const updateTranslation = (locale: string, key: string, value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [locale]: {
        ...prev[locale],
        [key]: value,
      },
    }))
  }

  const exportConfig = () => {
    const config = { languages, currencies, translations }
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "localization-config.json"
    a.click()
    URL.revokeObjectURL(url)
    toast({ title: "Config exported", description: "Configuration file has been downloaded." })
  }

  const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target?.result as string)
          if (config.languages) setLanguages(config.languages)
          if (config.currencies) setCurrencies(config.currencies)
          if (config.translations) setTranslations(config.translations)
          toast({ title: "Config imported", description: "Configuration has been loaded successfully." })
        } catch (error) {
          toast({ title: "Import failed", description: "Invalid JSON file.", variant: "destructive" })
        }
      }
      reader.readAsText(file)
    }
  }

  const enabledLanguages = languages.filter((l) => l.enabled)
  const enabledCurrencies = currencies.filter((c) => c.enabled)

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary" />
            Localization Settings
          </h1>
          <p className="text-muted-foreground">Manage languages, currencies, and translations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportConfig}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" asChild>
            <label className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              Import
              <input type="file" accept=".json" className="hidden" onChange={importConfig} />
            </label>
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100">
                <Languages className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{enabledLanguages.length}</p>
                <p className="text-sm text-muted-foreground">Active Languages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{enabledCurrencies.length}</p>
                <p className="text-sm text-muted-foreground">Active Currencies</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-100">
                <FileJson className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Object.keys(translations.en || {}).length}</p>
                <p className="text-sm text-muted-foreground">Translation Keys</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-amber-100">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {languages.find((l) => l.default)?.flag} {languages.find((l) => l.default)?.code.toUpperCase()}
                </p>
                <p className="text-sm text-muted-foreground">Default Language</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="languages" className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            Languages
          </TabsTrigger>
          <TabsTrigger value="currencies" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Currencies
          </TabsTrigger>
          <TabsTrigger value="translations" className="flex items-center gap-2">
            <FileJson className="h-4 w-4" />
            Translations
          </TabsTrigger>
        </TabsList>

        {/* Languages Tab */}
        <TabsContent value="languages">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Languages</CardTitle>
                <CardDescription>Configure available languages for your platform</CardDescription>
              </div>
              <Dialog
                open={showLanguageDialog && !editingLanguage}
                onOpenChange={(open) => {
                  setShowLanguageDialog(open)
                  if (!open) setEditingLanguage(null)
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setEditingLanguage(null)
                      setShowLanguageDialog(true)
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Language
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Language</DialogTitle>
                    <DialogDescription>Add a new language to your platform</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="langCode">Language Code</Label>
                        <Input
                          id="langCode"
                          placeholder="e.g., fr"
                          value={newLanguage.code}
                          onChange={(e) => setNewLanguage((prev) => ({ ...prev, code: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="langFlag">Flag Emoji</Label>
                        <Input
                          id="langFlag"
                          placeholder="e.g., 🇫🇷"
                          value={newLanguage.flag}
                          onChange={(e) => setNewLanguage((prev) => ({ ...prev, flag: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="langName">Language Name</Label>
                      <Input
                        id="langName"
                        placeholder="e.g., French"
                        value={newLanguage.name}
                        onChange={(e) => setNewLanguage((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="langNative">Native Name</Label>
                      <Input
                        id="langNative"
                        placeholder="e.g., Français"
                        value={newLanguage.nativeName}
                        onChange={(e) => setNewLanguage((prev) => ({ ...prev, nativeName: e.target.value }))}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowLanguageDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addLanguage}>Add Language</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Native Name</TableHead>
                    <TableHead className="text-center">Default</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {languages.map((language) => (
                    <TableRow key={language.code}>
                      <TableCell>
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{language.flag}</span>
                          <span className="font-medium">{language.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{language.code.toUpperCase()}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{language.nativeName}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant={language.default ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setDefaultLanguage(language.code)}
                          className={language.default ? "bg-amber-500 hover:bg-amber-600" : ""}
                        >
                          {language.default ? <Star className="h-4 w-4 fill-current" /> : <Star className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={language.enabled}
                          onCheckedChange={() => toggleLanguageEnabled(language.code)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingLanguage(language)
                              setShowLanguageDialog(true)
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => deleteLanguage(language.code)}
                            disabled={language.default}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Currencies Tab */}
        <TabsContent value="currencies">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Currencies</CardTitle>
                <CardDescription>Configure available currencies and exchange rates</CardDescription>
              </div>
              <Dialog
                open={showCurrencyDialog && !editingCurrency}
                onOpenChange={(open) => {
                  setShowCurrencyDialog(open)
                  if (!open) setEditingCurrency(null)
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setEditingCurrency(null)
                      setShowCurrencyDialog(true)
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Currency
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Currency</DialogTitle>
                    <DialogDescription>Add a new currency to your platform</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currCode">Currency Code</Label>
                        <Input
                          id="currCode"
                          placeholder="e.g., JPY"
                          value={newCurrency.code}
                          onChange={(e) => setNewCurrency((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currFlag">Flag Emoji</Label>
                        <Input
                          id="currFlag"
                          placeholder="e.g., 🇯🇵"
                          value={newCurrency.flag}
                          onChange={(e) => setNewCurrency((prev) => ({ ...prev, flag: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currName">Currency Name</Label>
                        <Input
                          id="currName"
                          placeholder="e.g., Japanese Yen"
                          value={newCurrency.name}
                          onChange={(e) => setNewCurrency((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currSymbol">Symbol</Label>
                        <Input
                          id="currSymbol"
                          placeholder="e.g., ¥"
                          value={newCurrency.symbol}
                          onChange={(e) => setNewCurrency((prev) => ({ ...prev, symbol: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currRate">Exchange Rate (to USD)</Label>
                      <Input
                        id="currRate"
                        type="number"
                        step="0.01"
                        placeholder="e.g., 149.50"
                        value={newCurrency.rate}
                        onChange={(e) =>
                          setNewCurrency((prev) => ({ ...prev, rate: Number.parseFloat(e.target.value) || 1 }))
                        }
                      />
                      <p className="text-xs text-muted-foreground">1 USD = X {newCurrency.code || "Currency"}</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowCurrencyDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addCurrency}>Add Currency</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Exchange Rate</TableHead>
                    <TableHead className="text-center">Default</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currencies.map((currency) => (
                    <TableRow key={currency.code}>
                      <TableCell>
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{currency.flag}</span>
                          <span className="font-medium">{currency.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{currency.code}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-lg">{currency.symbol}</TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">1 USD = </span>
                        <span className="font-medium">
                          {currency.rate.toFixed(2)} {currency.code}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant={currency.default ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setDefaultCurrency(currency.code)}
                          className={currency.default ? "bg-amber-500 hover:bg-amber-600" : ""}
                        >
                          {currency.default ? <Star className="h-4 w-4 fill-current" /> : <Star className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={currency.enabled}
                          onCheckedChange={() => toggleCurrencyEnabled(currency.code)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingCurrency(currency)
                              setShowCurrencyDialog(true)
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => deleteCurrency(currency.code)}
                            disabled={currency.default}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Translations Tab */}
        <TabsContent value="translations">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Translations</CardTitle>
                <CardDescription>Manage translation strings for each language</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Select value={selectedTranslationLocale} onValueChange={setSelectedTranslationLocale}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {enabledLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog open={showJsonDialog} onOpenChange={setShowJsonDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <FileJson className="mr-2 h-4 w-4" />
                      View JSON
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>Translations JSON</DialogTitle>
                      <DialogDescription>View and copy the translations configuration</DialogDescription>
                    </DialogHeader>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[50vh] text-sm">
                        {JSON.stringify(translations, null, 2)}
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 bg-transparent"
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(translations, null, 2))
                          toast({ title: "Copied", description: "JSON copied to clipboard" })
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(translations.en || {}).map(([key, englishValue]) => (
                  <div key={key} className="grid grid-cols-3 gap-4 items-start p-4 border rounded-lg">
                    <div>
                      <Label className="text-xs text-muted-foreground">Key</Label>
                      <p className="font-mono text-sm bg-muted px-2 py-1 rounded">{key}</p>
                      <p className="text-xs text-muted-foreground mt-1">English: {englishValue}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs text-muted-foreground">
                        Translation ({languages.find((l) => l.code === selectedTranslationLocale)?.name})
                      </Label>
                      <Input
                        value={translations[selectedTranslationLocale]?.[key] || ""}
                        onChange={(e) => updateTranslation(selectedTranslationLocale, key, e.target.value)}
                        placeholder={`Enter ${languages.find((l) => l.code === selectedTranslationLocale)?.name} translation`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Language Dialog */}
      <Dialog
        open={showLanguageDialog && !!editingLanguage}
        onOpenChange={(open) => {
          if (!open) {
            setEditingLanguage(null)
            setShowLanguageDialog(false)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Language</DialogTitle>
            <DialogDescription>Update language details</DialogDescription>
          </DialogHeader>
          {editingLanguage && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Language Code</Label>
                  <Input value={editingLanguage.code} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Flag Emoji</Label>
                  <Input
                    value={editingLanguage.flag}
                    onChange={(e) => setEditingLanguage({ ...editingLanguage, flag: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Language Name</Label>
                <Input
                  value={editingLanguage.name}
                  onChange={(e) => setEditingLanguage({ ...editingLanguage, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Native Name</Label>
                <Input
                  value={editingLanguage.nativeName}
                  onChange={(e) => setEditingLanguage({ ...editingLanguage, nativeName: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditingLanguage(null)
                setShowLanguageDialog(false)
              }}
            >
              Cancel
            </Button>
            <Button onClick={updateLanguage}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Currency Dialog */}
      <Dialog
        open={showCurrencyDialog && !!editingCurrency}
        onOpenChange={(open) => {
          if (!open) {
            setEditingCurrency(null)
            setShowCurrencyDialog(false)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Currency</DialogTitle>
            <DialogDescription>Update currency details and exchange rate</DialogDescription>
          </DialogHeader>
          {editingCurrency && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Currency Code</Label>
                  <Input value={editingCurrency.code} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Flag Emoji</Label>
                  <Input
                    value={editingCurrency.flag}
                    onChange={(e) => setEditingCurrency({ ...editingCurrency, flag: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Currency Name</Label>
                  <Input
                    value={editingCurrency.name}
                    onChange={(e) => setEditingCurrency({ ...editingCurrency, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Symbol</Label>
                  <Input
                    value={editingCurrency.symbol}
                    onChange={(e) => setEditingCurrency({ ...editingCurrency, symbol: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Exchange Rate (to USD)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editingCurrency.rate}
                  onChange={(e) =>
                    setEditingCurrency({ ...editingCurrency, rate: Number.parseFloat(e.target.value) || 1 })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  1 USD = {editingCurrency.rate} {editingCurrency.code}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditingCurrency(null)
                setShowCurrencyDialog(false)
              }}
            >
              Cancel
            </Button>
            <Button onClick={updateCurrency}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
