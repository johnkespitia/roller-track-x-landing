"use client";

import { useState } from "react";
import { submitForm, FormSchoolData } from "@/lib/forms";
import { trackFormSubmit } from "@/lib/analytics";
import CTAButton from "./CTAButton";

export default function FormSchool() {
  const [formData, setFormData] = useState<FormSchoolData>({
    nombreEscuela: "",
    ciudad: "",
    nombreContacto: "",
    rol: "",
    whatsapp: "",
    email: "",
    numeroDeportistas: "",
    interes: "",
    comentarios: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormSchoolData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormSchoolData, string>> = {};

    if (!formData.nombreEscuela.trim()) {
      newErrors.nombreEscuela = "El nombre de la escuela es requerido";
    }
    if (!formData.ciudad.trim()) {
      newErrors.ciudad = "La ciudad es requerida";
    }
    if (!formData.nombreContacto.trim()) {
      newErrors.nombreContacto = "El nombre del contacto es requerido";
    }
    if (!formData.rol.trim()) {
      newErrors.rol = "El rol es requerido";
    }
    if (!formData.whatsapp?.trim() && !formData.email?.trim()) {
      newErrors.whatsapp = "WhatsApp o email es requerido";
      newErrors.email = "WhatsApp o email es requerido";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot) {
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await submitForm("school", formData);
      if (result.success) {
        setSubmitStatus("success");
        trackFormSubmit("school");
        // Reset form
        setFormData({
          nombreEscuela: "",
          ciudad: "",
          nombreContacto: "",
          rol: "",
          whatsapp: "",
          email: "",
          numeroDeportistas: "",
          interes: "",
          comentarios: "",
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
    // Clear error when user starts typing
    if (errors[name as keyof FormSchoolData]) {
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
          Nos pondremos en contacto contigo pronto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
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
        <label htmlFor="nombreEscuela" className="block text-sm font-medium text-dark mb-2">
          Nombre de la escuela/club <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="nombreEscuela"
          name="nombreEscuela"
          value={formData.nombreEscuela}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
            errors.nombreEscuela ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.nombreEscuela && (
          <p className="mt-1 text-sm text-red-600">{errors.nombreEscuela}</p>
        )}
      </div>

      <div>
        <label htmlFor="ciudad" className="block text-sm font-medium text-dark mb-2">
          Ciudad <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="ciudad"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
            errors.ciudad ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.ciudad && (
          <p className="mt-1 text-sm text-red-600">{errors.ciudad}</p>
        )}
      </div>

      <div>
        <label htmlFor="nombreContacto" className="block text-sm font-medium text-dark mb-2">
          Nombre del contacto <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="nombreContacto"
          name="nombreContacto"
          value={formData.nombreContacto}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
            errors.nombreContacto ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.nombreContacto && (
          <p className="mt-1 text-sm text-red-600">{errors.nombreContacto}</p>
        )}
      </div>

      <div>
        <label htmlFor="rol" className="block text-sm font-medium text-dark mb-2">
          Rol <span className="text-primary">*</span>
        </label>
        <select
          id="rol"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
            errors.rol ? "border-red-500" : "border-gray-300"
          }`}
          required
        >
          <option value="">Selecciona...</option>
          <option value="director">Director</option>
          <option value="entrenador">Entrenador</option>
          <option value="otro">Otro</option>
        </select>
        {errors.rol && (
          <p className="mt-1 text-sm text-red-600">{errors.rol}</p>
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
            placeholder="contacto@escuela.com"
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
        <label htmlFor="numeroDeportistas" className="block text-sm font-medium text-dark mb-2">
          Número de deportistas (opcional)
        </label>
        <input
          type="number"
          id="numeroDeportistas"
          name="numeroDeportistas"
          value={formData.numeroDeportistas}
          onChange={handleChange}
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="interes" className="block text-sm font-medium text-dark mb-2">
          Interés (opcional)
        </label>
        <select
          id="interes"
          name="interes"
          value={formData.interes}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="">Selecciona...</option>
          <option value="piloto">Piloto</option>
          <option value="eventos">Eventos</option>
          <option value="seguimiento">Seguimiento</option>
          <option value="sponsorship">Sponsorship</option>
        </select>
      </div>

      <div>
        <label htmlFor="comentarios" className="block text-sm font-medium text-dark mb-2">
          Comentarios (opcional)
        </label>
        <textarea
          id="comentarios"
          name="comentarios"
          value={formData.comentarios}
          onChange={handleChange}
          rows={4}
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
