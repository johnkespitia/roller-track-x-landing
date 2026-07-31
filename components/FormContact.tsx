"use client";

import { useState } from "react";
import { submitLead } from "@/lib/leads";
import { trackFormSubmit } from "@/lib/analytics";
import CTAButton from "./CTAButton";

interface FormContactData {
  name: string;
  email: string;
  phone: string;
  city: string;
  interest: string;
  message: string;
  consent: boolean;
}

export default function FormContact({ sourcePage = "/contacto" }: { sourcePage?: string } = {}) {
  const [formData, setFormData] = useState<FormContactData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    interest: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormContactData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [honeypot, setHoneypot] = useState("");

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormContactData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.email = "Email o teléfono es requerido";
      newErrors.phone = "Email o teléfono es requerido";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.message.trim()) newErrors.message = "Cuéntanos en qué podemos ayudarte";
    if (!formData.consent) newErrors.consent = "Debes aceptar la política de privacidad";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const result = await submitLead({
        type: "contact",
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone || null,
        city: formData.city || null,
        interest: formData.interest || null,
        message: formData.message,
        source_page: sourcePage,
        consent: formData.consent,
        website: honeypot,
      });

      if (result.ok) {
        setSubmitStatus("success");
        trackFormSubmit("contact" as any);
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          interest: "",
          message: "",
          consent: false,
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Error al enviar el formulario");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormContactData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-heading font-bold text-green-800 mb-2">
          ¡Mensaje enviado!
        </h3>
        <p className="text-green-700">Te responderemos pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
          Nombre <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
            WhatsApp
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+57 300 000 0000"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-dark mb-2">
            Ciudad (opcional)
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="interest" className="block text-sm font-medium text-dark mb-2">
            Tema (opcional)
          </label>
          <select
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Selecciona...</option>
            <option value="general">Consulta general</option>
            <option value="prensa">Prensa / medios</option>
            <option value="alianza">Alianza estratégica</option>
            <option value="otro">Otro</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
          Mensaje <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 mr-2"
        />
        <label htmlFor="consent" className="text-sm text-gray-700">
          Acepto los{" "}
          <a href="/legal" className="text-primary hover:underline">
            términos y política de privacidad
          </a>
          . Autorizo el uso de mis datos para contacto. <span className="text-primary">*</span>
        </label>
      </div>
      {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent}</p>}

      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">
            {errorMessage || "Hubo un error al enviar el formulario. Por favor intenta de nuevo."}
          </p>
        </div>
      )}

      <CTAButton
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </CTAButton>
    </form>
  );
}
