import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/hooks/useProducts";
import { getProductById, getProductDisplayImage } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const CHECKOUT_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalItems } = useCart();
  const { products } = useProducts();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartWithProducts = items
    .map((item) => ({ item, product: getProductById(products, item.productId) }))
    .filter((x): x is typeof x & { product: NonNullable<typeof x.product> } => !!x.product);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartWithProducts.length === 0) {
      toast({ title: "Cart is empty", variant: "destructive" });
      return;
    }
    if (!form.name.trim() || !form.email.trim()) {
      toast({ title: "Please enter your name and email", variant: "destructive" });
      return;
    }
    if (!CHECKOUT_ACCESS_KEY) {
      toast({ title: "Checkout not configured", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    const lines = cartWithProducts.map(
      (x) => `- ${x.product.title} (${x.product.brand}) × ${x.item.quantity} | ${x.product.price || "Contact for pricing"}`
    );
    const orderText = [
      "--- ORDER / CART ENQUIRY ---",
      "",
      "Customer: " + form.name,
      "Email: " + form.email,
      "Phone: " + (form.phone || "—"),
      "Address / Notes: " + (form.address || "—"),
      "Additional notes: " + (form.notes || "—"),
      "",
      "Cart:",
      ...lines,
      "",
      "--- End of order ---",
    ].join("\n");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: CHECKOUT_ACCESS_KEY,
          subject: "Order / Cart enquiry from NFlex Solutions website – " + form.name,
          from_name: form.name,
          email: form.email,
          message: orderText,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Order sent!", description: "We'll contact you at " + form.email + " shortly." });
        clearCart();
        setForm({ name: "", email: "", phone: "", address: "", notes: "" });
        navigate("/products");
      } else {
        toast({ title: "Could not send order", description: data.message || "Try again or email us.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Something went wrong", description: "Try again or email Info@nflexsolutions.com", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO title="Cart" description="Your cart – NFlex Solutions. Review and send your product list for a quote." path="/cart" />
      <section className="hero-gradient pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl font-display font-extrabold text-hero-foreground">
            Your Cart
          </h1>
          <p className="mt-2 text-hero-muted">
            {totalItems === 0 ? "No items yet." : `${totalItems} item${totalItems !== 1 ? "s" : ""} in cart.`}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          {cartWithProducts.length === 0 ? (
            <ScrollReveal>
              <div className="rounded-2xl border border-border bg-card p-12 text-center">
                <ShoppingCart size={48} className="mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-display font-semibold text-foreground mb-2">Cart is empty</h2>
                <p className="text-muted-foreground mb-6">Add products from the catalog to request a quote or place an order.</p>
                <Link to="/products">
                  <Button className="gap-2">Browse Products <ArrowRight size={16} /></Button>
                </Link>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-4">
                {cartWithProducts.map(({ item, product }) => (
                  <ScrollReveal key={product.id}>
                    <div className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                      <div className="w-20 h-20 rounded-lg bg-muted flex-shrink-0 overflow-hidden flex items-center justify-center">
                        {getProductDisplayImage(product) ? (
                          <img src={getProductDisplayImage(product)!} alt="" className={`brand-logo w-full h-full ${product.brand === "SICK" ? "brand-logo--sick" : ""}`} />
                        ) : (
                          <span className="text-2xl font-bold text-muted-foreground">{product.brand.charAt(0)}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link to={`/products/${product.id}`} className="font-display font-semibold text-foreground hover:text-primary line-clamp-2">
                          {product.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">{product.brand} · {product.price || "Contact for pricing"}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, item.quantity - 1)}>
                            <Minus size={14} />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, item.quantity + 1)}>
                            <Plus size={14} />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive ml-2" onClick={() => removeFromCart(product.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal>
                <form onSubmit={handleCheckout} className="p-6 rounded-2xl border border-border bg-card space-y-4 sticky top-28">
                  <h3 className="font-display font-semibold text-foreground">Checkout</h3>
                  <p className="text-sm text-muted-foreground">We'll send this cart to Info@nflexsolutions.com and contact you.</p>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Name *</label>
                    <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email *</label>
                    <Input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Phone</label>
                    <Input placeholder="9873100982" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Address / Company</label>
                    <Input placeholder="Delivery or company address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Notes</label>
                    <Input placeholder="Any special requirements" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                  </div>
                  <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Send order to Info@nflexsolutions.com</>}
                  </Button>
                </form>
              </ScrollReveal>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
