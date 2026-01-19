"use client";

import { useState } from "react";
import { submitForm, FormSponsorData } from "@/lib/forms";
import { trackFormSubmit } from "@/lib/analytics";
import CTAButton from "./CTAButton";

export default function FormSponsor() {
  const [formData, setFormData] = useState<FormSponsorData>({
    empresa: "",
    contacto: "",
    email: "",
    whatsapp: "",
    interes: "",
    presupuesto: "",
    objetivoMarca: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormSponsorData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormSponsorData, string>> = {};

    if (!formData.empresa.trim()) {
      newErrors.empresa = "El nombre de la empresa es requerido";
    }
    if (!formData.contacto.trim()) {
      newErrors.contacto = "El nombre del contacto es requerido";
    }
    if (!formData.whatsapp?.trim() && !formData.email?.trim()) {
      newErrors.whatsapp = "WhatsApp o email es requerido";
      newErrors.email = "WhatsApp o email es requerido";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.interes.trim()) {
      newErrors.interes = "El interés es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await submitForm("sponsor", formData);
      if (result.success) {
        setSubmitStatus("success");
        trackFormSubmit("sponsor");
        setFormData({
          empresa: "",
          contacto: "",
          email: "",
          whatsapp: "",
          interes: "",
          presupuesto: "",
          objetivoMarca: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormSponsorData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-heading font-bold text-green-800 mb-2">
          ¡Formulario enviado!
        </h3>
        <p className="text-green-700">
          Nos pondremos en contacto contigo pronto para conversar sobre oportunidades de patrocinio.
        </p>
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
        <label htmlFor="empresa" className="block text-sm font-medium text-dark mb-2">
          Empresa/Marca <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="empresa"
          name="empresa"
          value={formData.empresa}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
            errors.empresa ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.empresa && (
          <p className="mt-1 text-sm text-red-600">{errors.empresa}</p>
        )}
      </div>

      <div>
        <label htmlFor="contacto" className="block text-sm font-medium text-dark mb-2">
          Nombre del contacto <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="contacto"
          name="contacto"
          value={formData.contacto}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
            errors.contacto ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.contacto && (
          <p className="mt-1 text-sm text-red-600">{errors.contacto}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-dark mb-2">
            WhatsApp
          </label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="+57 300 123 4567"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.whatsapp ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.whatsapp && (
            <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>
          )}
        </div>

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
            placeholder="contacto@empresa.com"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="interes" className="block text-sm font-medium text-dark mb-2">
          Interés <span className="text-primary">*</span>
        </label>
        <select
          id="interes"
          name="interes"
          value={formData.interes}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
            errors.interes ? "border-red-500" : "border-gray-300"
          }`}
          required
        >
          <option value="">Selecciona...</option>
          <option value="evento">Evento</option>
          <option value="contenido">Contenido digital</option>
          <option value="becas">Becas</option>
          <option value="otro">Otro</option>
        </select>
        {errors.interes && (
          <p className="mt-1 text-sm text-red-600">{errors.interes}</p>
        )}
      </div>

      <div>
        <label htmlFor="presupuesto" className="block text-sm font-medium text-dark mb-2">
          Presupuesto estimado (opcional)
        </label>
        <input
          type="text"
          id="presupuesto"
          name="presupuesto"
          value={formData.presupuesto}
          onChange={handleChange}
          placeholder="Ej: $5M - $10M COP"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="objetivoMarca" className="block text-sm font-medium text-dark mb-2">
          Objetivo de marca (opcional)
        </label>
        <textarea
          id="objetivoMarca"
          name="objetivoMarca"
          value={formData.objetivoMarca}
          onChange={handleChange}
          rows={4}
          placeholder="Cuéntanos qué buscas lograr con el patrocinio..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          className="mt-1 mr-2"
        />
        <label htmlFor="consent" className="text-sm text-gray-700">
          Acepto los{" "}
          <a href="/legal" className="text-primary hover:underline">
            términos y política de privacidad
          </a>
          . Autorizo el uso de mis datos para contacto y estadísticas agregadas.{" "}
          <span className="text-primary">*</span>
        </label>
      </div>

      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">
            Hubo un error al enviar el formulario. Por favor intenta de nuevo.
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
        {isSubmitting ? "Enviando..." : "Enviar formulario"}
      </CTAButton>
    </form>
  );
}
