"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/app/components/Container";

// Browser-facing backend URL (see login page). Defaults to local dev.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";
const CREATE_URL = `${API_BASE}/api/apartments`;

// Read the JWT saved by the login page.
function getToken() {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith("nawy_token="))
    ?.split("=")[1];
}

const initialForm = {
  unitName: "",
  unitNumber: "",
  project: "",
  description: "",
  price: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  imageUrl: "",
  address: "",
};

export default function CreateApartmentPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const body = {
        unitName: form.unitName,
        unitNumber: form.unitNumber,
        project: form.project,
        description: form.description,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        area: Number(form.area),
        ...(form.imageUrl ? { imageUrl: form.imageUrl } : {}),
        ...(form.address ? { address: form.address } : {}),
      };

      const res = await fetch(CREATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      // Token missing/expired -> back to login.
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Failed to create apartment.");
        return;
      }

      const created = await res.json();
      router.push(`/apartments/${created.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <main className="py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <h1 className="mb-5 text-3xl font-extrabold text-[#1E4164]">
            Add apartment
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit();
            }}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field
                id="unitName"
                label="Unit name"
                value={form.unitName}
                onChange={(v) => update("unitName", v)}
                required
              />
              <Field
                id="unitNumber"
                label="Unit number"
                value={form.unitNumber}
                onChange={(v) => update("unitNumber", v)}
                required
              />
            </div>

            <Field
              id="project"
              label="Project"
              value={form.project}
              onChange={(v) => update("project", v)}
              required
            />

            <div className="space-y-1.5">
              <label
                htmlFor="description"
                className="text-sm font-medium text-[#1E4164]"
              >
                Description
                <span className="text-red-500"> *</span>
              </label>
              <textarea
                id="description"
                rows={3}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                required
                className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm outline-none focus:border-[#1E4164] focus:ring-1 focus:ring-[#1E4164]"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <Field
                id="price"
                label="Price (EGP)"
                type="number"
                value={form.price}
                onChange={(v) => update("price", v)}
                required
              />
              <Field
                id="area"
                label="Area (m²)"
                type="number"
                value={form.area}
                onChange={(v) => update("area", v)}
                required
              />
              <Field
                id="bedrooms"
                label="Bedrooms"
                type="number"
                value={form.bedrooms}
                onChange={(v) => update("bedrooms", v)}
                required
              />
              <Field
                id="bathrooms"
                label="Bathrooms"
                type="number"
                value={form.bathrooms}
                onChange={(v) => update("bathrooms", v)}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field
                id="address"
                label="Address"
                value={form.address}
                onChange={(v) => update("address", v)}
              />
              <Field
                id="imageUrl"
                label="Image URL"
                type="url"
                value={form.imageUrl}
                onChange={(v) => update("imageUrl", v)}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full bg-[#FF5E00] font-bold hover:bg-[#e65400]"
            >
              {loading ? "Adding..." : "Add apartment"}
            </Button>
          </form>
        </div>
      </main>
    </Container>
  );
}

// Small labeled input; shows a red * when the field is required.
function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#1E4164]">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}
