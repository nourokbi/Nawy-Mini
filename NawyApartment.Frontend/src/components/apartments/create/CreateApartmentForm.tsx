"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getToken, clearToken } from "@/lib/session";
import { createApartment } from "@/api/apartments";
import { ApiError } from "@/api/error";

// If the token is missing/expired, send the user to login and come back here.
const LOGIN_REDIRECT = `/login?redirect=${encodeURIComponent("/apartments/create")}`;

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

export default function CreateApartmentForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Updates the field whose `name` matches the input that changed.
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        router.replace(LOGIN_REDIRECT);
        return;
      }

      const created = await createApartment(
        {
          unitName: form.unitName,
          unitNumber: form.unitNumber,
          project: form.project,
          price: Number(form.price),
          bedrooms: Number(form.bedrooms),
          bathrooms: Number(form.bathrooms),
          area: Number(form.area),
          description: form.description || null,
          imageUrl: form.imageUrl || null,
          address: form.address || null,
        },
        token,
      );

      router.push(`/apartments/${created.id}`);
    } catch (err) {
      // Token expired mid-session -> clear it and send back to login.
      if (err instanceof ApiError && err.status === 401) {
        clearToken();
        router.replace(LOGIN_REDIRECT);
        return;
      }
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
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
          <div className="space-y-1.5">
            <label
              htmlFor="unitName"
              className="text-sm font-medium text-[#1E4164]"
            >
              Unit name <span className="text-red-500">*</span>
            </label>
            <Input
              id="unitName"
              name="unitName"
              value={form.unitName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="unitNumber"
              className="text-sm font-medium text-[#1E4164]"
            >
              Unit number <span className="text-red-500">*</span>
            </label>
            <Input
              id="unitNumber"
              name="unitNumber"
              value={form.unitNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="project"
            className="text-sm font-medium text-[#1E4164]"
          >
            Project <span className="text-red-500">*</span>
          </label>
          <Input
            id="project"
            name="project"
            value={form.project}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="description"
            className="text-sm font-medium text-[#1E4164]"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm outline-none focus:border-[#1E4164] focus:ring-1 focus:ring-[#1E4164]"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <div className="space-y-1.5">
            <label
              htmlFor="price"
              className="text-sm font-medium text-[#1E4164]"
            >
              Price (EGP) <span className="text-red-500">*</span>
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="area"
              className="text-sm font-medium text-[#1E4164]"
            >
              Area (m²) <span className="text-red-500">*</span>
            </label>
            <Input
              id="area"
              name="area"
              type="number"
              value={form.area}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="bedrooms"
              className="text-sm font-medium text-[#1E4164]"
            >
              Bedrooms <span className="text-red-500">*</span>
            </label>
            <Input
              id="bedrooms"
              name="bedrooms"
              type="number"
              value={form.bedrooms}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="bathrooms"
              className="text-sm font-medium text-[#1E4164]"
            >
              Bathrooms <span className="text-red-500">*</span>
            </label>
            <Input
              id="bathrooms"
              name="bathrooms"
              type="number"
              value={form.bathrooms}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="address"
              className="text-sm font-medium text-[#1E4164]"
            >
              Address
            </label>
            <Input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="imageUrl"
              className="text-sm font-medium text-[#1E4164]"
            >
              Image URL
            </label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
            />
          </div>
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
  );
}
