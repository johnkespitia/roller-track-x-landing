"use client";

import { useState } from "react";
import { submitLead } from "@/lib/leads";
import { trackFormSubmit } from "@/lib/analytics";
import CTAButton from "./CTAButton";

interface FormAthleteProps {
  onSuccess?: () => void;
  sourcePage?: string;
}

interface FormAthleteData {
  nombre: string;
  edadCategoria: string;
  ciudad: string;
  club: string;
  whatsapp: string;
  email: string;
  distancias: string;
  mejorTiempo: string;
  linkVideo: string;
  consent: boolean;
}

export default function FormAthlete({
  onSuccess,
  sourcePage = "/deportistas",
}: FormAthleteProps = {}) {
  const [formData, setFormData] = useState<FormAthleteData>({
    nombre: "",
    edadCategoria: "",
    ciudad: "",
    club: "",
    whatsapp: "",
    email: "",
    distancias: "",
    mejorTiempo: "",
    linkVideo: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormAthleteData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [honeypot, setHoneypot] = useState("");

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormAthleteData, string>> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }
    if (!formData.edadCategoria.trim()) {
      newErrors.edadCategoria = "La edad o categoría es requerida";
    }
    if (!formData.ciudad.trim()) {
      newErrors.ciudad = "La ciudad es requerida";
    }
    if (!formData.whatsapp?.trim() && !formData.email?.trim()) {
      newErrors.whatsapp = "WhatsApp o email es requerido";
      newErrors.email = "WhatsApp o email es requerido";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (formData.linkVideo && !/^https?:\/\/.+/.test(formData.linkVideo)) {
      newErrors.linkVideo = "URL inválida";
    }
    if (!formData.consent) {
      newErrors.consent = "Debes aceptar la política de privacidad";
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
    setErrorMessage("");

    try {
      const result = await submitLead({
        type: "athlete",
        name: formData.nombre,
        organization: formData.club || null,
        email: formData.email || null,
        phone: formData.whatsapp || null,
        city: formData.ciudad,
        source_page: sourcePage,
        consent: formData.consent,
        website: honeypot,
        metadata: {
          edad_categoria: formData.edadCategoria,
          distancias: formData.distancias,
          mejor_tiempo: formData.mejorTiempo,
          link_video: formData.linkVideo,
        },
      });

      if (result.ok) {
        setSubmitStatus("success");
        trackFormSubmit("athlete");

        // Persistencia local de la última inscripción (UX, no fuente de verdad).
        if (typeof window !== "undefined") {
          localStorage.setItem("rtx_last_registration", JSON.stringify(formData));
        }

        setFormData({
          nombre: "",
          edadCategoria: "",
          ciudad: "",
          club: "",
          whatsapp: "",
          email: "",
          distancias: "",
          mejorTiempo: "",
          linkVideo: "",
          consent: false,
        });

        onSuccess?.();
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormAthleteData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-heading font-bold text-green-800 mb-2">
          ¡Registro exitoso!
        </h3>
        <p className="text-green-700">
          Te contactaremos pronto para continuar con tu perfil.
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
        <label htmlFor="nombre" className="block text-sm font-medium text-dark mb-2">
          Nombre completo <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
            errors.nombre ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
        )}
      </div>

      <div>
        <label htmlFor="edadCategoria" className="block text-sm font-medium text-dark mb-2">
          Edad o categoría <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="edadCategoria"
          name="edadCategoria"
          value={formData.edadCategoria}
          onChange={handleChange}
          placeholder="Ej: 15 años o Pre-juvenil"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
            errors.edadCategoria ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.edadCategoria && (
          <p className="mt-1 text-sm text-red-600">{errors.edadCategoria}</p>
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
        <label htmlFor="club" className="block text-sm font-medium text-dark mb-2">
          Escuela/club (opcional)
        </label>
        <input
          type="text"
          id="club"
          name="club"
          value={formData.club}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
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
            placeholder="deportista@email.com"
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
        <label htmlFor="distancias" className="block text-sm font-medium text-dark mb-2">
          Distancias principales (opcional)
        </label>
        <input
          type="text"
          id="distancias"
          name="distancias"
          value={formData.distancias}
          onChange={handleChange}
          placeholder="Ej: 200m, 500m, 1000m"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="mejorTiempo" className="block text-sm font-medium text-dark mb-2">
          Mejor tiempo reciente (opcional)
        </label>
        <input
          type="text"
          id="mejorTiempo"
          name="mejorTiempo"
          value={formData.mejorTiempo}
          onChange={handleChange}
          placeholder="Ej: 500m en 45.2s"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="linkVideo" className="block text-sm font-medium text-dark mb-2">
          Link a video (opcional)
        </label>
        <input
          type="url"
          id="linkVideo"
          name="linkVideo"
          value={formData.linkVideo}
          onChange={handleChange}
          placeholder="YouTube, Drive, Instagram, etc."
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
            errors.linkVideo ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.linkVideo && (
          <p className="mt-1 text-sm text-red-600">{errors.linkVideo}</p>
        )}
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
          . Autorizo el uso de mis datos para contacto y estadísticas agregadas.{" "}
          <span className="text-primary">*</span>
        </label>
      </div>
      {errors.consent && (
        <p className="mt-1 text-sm text-red-600">{errors.consent}</p>
      )}

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
        {isSubmitting ? "Enviando..." : "Registrarme"}
      </CTAButton>
    </form>
  );
}
