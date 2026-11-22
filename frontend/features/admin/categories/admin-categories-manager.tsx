"use client";
import { useState } from "react";
import { Plus, Save, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/controls";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/controls";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import type { AdminCategory } from "../types";

export function AdminCategoriesManager({ items }: { items: AdminCategory[] }) {
  const { toast } = useToast();
  const [categories, setCategories] = useState(items);
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");

  const toggle = (id: string) => {
    setCategories((current) => current.map((category) => (category.id === id ? { ...category, active: !category.active } : category)));
    toast({ title: "Status kategori diperbarui", tone: "success" });
  };

  const remove = (id: string) => {
    setCategories((current) => current.filter((category) => category.id !== id));
    toast({ title: "Kategori dihapus", tone: "info" });
  };

  const add = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!label.trim()) return;
    setCategories((current) => [
      ...current,
      {
        id: `cat-${Date.now()}`,
        label: label.trim(),
        slug: label.trim().toLowerCase().replace(/\s+/g, "-"),
        count: 0,
        active: true,
        description: description.trim() || "Kategori baru.",
      },
    ]);
    setLabel("");
    setDescription("");
    setOpen(false);
    toast({ title: "Kategori ditambahkan", tone: "success" });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-text-muted">{categories.length} kategori, {categories.filter((category) => category.active).length} aktif.</p>
        <Button onClick={() => setOpen(true)}>
          <Plus className="size-4" aria-hidden="true" />
          Tambah kategori
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{category.label}</h3>
                <p className="text-xs text-text-muted">/{category.slug}</p>
              </div>
              <Badge tone={category.active ? "primary" : "neutral"}>{category.active ? "Aktif" : "Nonaktif"}</Badge>
            </div>
            <p className="mt-3 flex-1 text-sm leading-6 text-text-muted">{category.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-text-muted">{category.count} listing</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" aria-label={`${category.active ? "Nonaktifkan" : "Aktifkan"} ${category.label}`} onClick={() => toggle(category.id)}>
                  {category.active ? <ToggleRight className="size-4" aria-hidden="true" /> : <ToggleLeft className="size-4" aria-hidden="true" />}
                </Button>
                <Button variant="ghost" size="sm" aria-label={`Hapus ${category.label}`} className="text-danger" onClick={() => remove(category.id)}>
                  <Trash2 className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Tambah kategori">
        <form onSubmit={add} className="space-y-4">
          <FormField label="Nama kategori" htmlFor="category-label" required>
            <Input id="category-label" value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Contoh: Tekstil daur ulang" />
          </FormField>
          <FormField label="Deskripsi" htmlFor="category-description">
            <Textarea id="category-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Jelaskan cakupan kategori ini." />
          </FormField>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Batal</Button>
            <Button type="submit"><Save className="size-4" aria-hidden="true" />Simpan</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
