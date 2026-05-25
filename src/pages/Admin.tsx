import { useState } from "react";
import { Plus, Pencil, Trash2, RotateCcw, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { useProducts } from "@/hooks/useProducts";
import { brands, categories, Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const emptyForm = {
  title: "", brand: brands[0] as string, category: "Sensors",
  description: "", badge: "", price: "",
  specsText: "", featuresText: "",
  datasheetUrl: "", imageUrl: "",
};

const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      title: p.title, brand: p.brand, category: p.category,
      description: p.description, badge: p.badge || "", price: p.price || "",
      specsText: Object.entries(p.specs).map(([k, v]) => `${k}: ${v}`).join("\n"),
      featuresText: p.features.join("\n"),
      datasheetUrl: p.datasheetUrl || "",
      imageUrl: p.imageUrl || "",
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast({ title: "Validation Error", description: "Title and description are required.", variant: "destructive" });
      return;
    }
    const specs: Record<string, string> = {};
    form.specsText.split("\n").filter(Boolean).forEach((line) => {
      const idx = line.indexOf(":");
      if (idx > 0) specs[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    });
    const features = form.featuresText.split("\n").map((f) => f.trim()).filter(Boolean);
    const data = {
      title: form.title.trim(), brand: form.brand, category: form.category,
      description: form.description.trim(), badge: form.badge.trim() || undefined,
      price: form.price.trim() || undefined, specs, features,
      datasheetUrl: form.datasheetUrl.trim() || undefined,
      imageUrl: form.imageUrl.trim() || undefined,
    };

    if (editingId) {
      updateProduct(editingId, data);
      toast({ title: "Product Updated" });
    } else {
      addProduct(data);
      toast({ title: "Product Added" });
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete "${title}"?`)) {
      deleteProduct(id);
      toast({ title: "Product Deleted" });
    }
  };

  const handleReset = () => {
    if (confirm("Reset all products to defaults? Custom products will be lost.")) {
      resetProducts();
      toast({ title: "Products Reset" });
    }
  };

  const catOptions = categories.filter((c) => c !== "All");

  return (
    <Layout>
      <section className="hero-gradient pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <span className="animate-fade-up text-primary font-medium text-sm tracking-widest uppercase mb-4 block">Admin</span>
          <h1 className="animate-fade-up-delay-1 text-3xl md:text-4xl font-display font-extrabold text-hero-foreground">
            Product <span className="text-gradient">Management</span>
          </h1>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
            <Input placeholder="Search products..." className="sm:w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="flex gap-2">
              <Button onClick={openAdd} className="gap-2"><Plus size={16} /> Add Product</Button>
              <Button variant="outline" onClick={handleReset} className="gap-2"><RotateCcw size={16} /> Reset</Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-4">{filtered.length} products</div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 text-left">
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Brand</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Price</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-t border-border hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-foreground">{p.title}</div>
                        <div className="text-xs text-muted-foreground sm:hidden">{p.brand} · {p.category}</div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.brand}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.category}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{p.price || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil size={14} /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id, p.title)} className="text-destructive hover:text-destructive"><Trash2 size={14} /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">{editingId ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Title *</label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Brand</label>
                <Select value={form.brand} onValueChange={(v) => setForm({ ...form, brand: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{brands.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Category</label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{catOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Description *</label>
              <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Badge</label>
                <Input placeholder="e.g. New, Popular" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Price</label>
                <Input placeholder="e.g. ₹25,000" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Specifications (one per line, Key: Value)</label>
              <Textarea rows={4} placeholder="Power Range: 0.37 – 250 kW&#10;Voltage: 380 – 480V" value={form.specsText} onChange={(e) => setForm({ ...form, specsText: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Features (one per line)</label>
              <Textarea rows={4} placeholder="Integrated safety functions&#10;Energy-saving mode" value={form.featuresText} onChange={(e) => setForm({ ...form, featuresText: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Image URL</label>
              <Input placeholder="e.g. /products/elco/sensor.png" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Datasheet URL</label>
              <Input placeholder="e.g. /datasheets/s1.pdf or full URL" value={form.datasheetUrl} onChange={(e) => setForm({ ...form, datasheetUrl: e.target.value })} />
              <p className="text-xs text-muted-foreground mt-1">Put PDFs in public/datasheets/ then use /datasheets/filename.pdf for direct download.</p>
            </div>
            <Button onClick={handleSave} className="w-full gap-2"><Save size={16} /> {editingId ? "Update" : "Add"} Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
