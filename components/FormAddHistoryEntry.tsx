"use client";

import { useState } from "react";
import { submitForm, AthleteHistoryEntry } from "@/lib/forms";
import { trackFormSubmit } from "@/lib/analytics";
import CTAButton from "./CTAButton";
import type { AthleteBasicInfo } from "./AthleteProfile";

interface FormAddHistoryEntryProps {
  athleteInfo: AthleteBasicInfo;
  onSuccess: (entry: {
    fecha: string;
    prueba: string;
    distancia: string;
    tiempo: string;
    lugar?: string;
    evento?: string;
    notas?: string;
    linkVideo?: string;
  }) => void;
  onCancel: () => void;
}

export default function FormAddHistoryEntry({
  athleteInfo,
  onSuccess,
  onCancel,
}: FormAddHistoryEntryProps) {
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split("T")[0],
    prueba: "",
    distancia: "",
    tiempo: "",
    lugar: "",
    evento: "",
    notas: "",
    linkVideo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [honeypot, setHoneypot] = useState("");

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fecha.trim()) {
      newErrors.fecha = "La fecha es requerida";
    }
    if (!formData.prueba.trim()) {
      newErrors.prueba = "El nombre de la prueba es requerido";
    }
    if (!formData.distancia.trim()) {
      newErrors.distancia = "La distancia es requerida";
    }
    if (!formData.tiempo.trim()) {
      newErrors.tiempo = "El tiempo es requerido";
    }
    if (formData.linkVideo && !/^https?:\/\/.+/.test(formData.linkVideo)) {
      newErrors.linkVideo = "URL inválida";
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
      const historyEntry: AthleteHistoryEntry = {
        athleteName: athleteInfo.nombre,
        athleteEmail: athleteInfo.email,
        athleteWhatsapp: athleteInfo.whatsapp,
        fecha: formData.fecha,
        prueba: formData.prueba,
        distancia: formData.distancia,
        tiempo: formData.tiempo,
        lugar: formData.lugar || undefined,
        evento: formData.evento || undefined,
        notas: formData.notas || undefined,
        linkVideo: formData.linkVideo || undefined,
      };

      const result = await submitForm("athlete_history", historyEntry);
      if (result.success) {
        setSubmitStatus("success");
        trackFormSubmit("athlete");
        onSuccess({
          fecha: formData.fecha,
          prueba: formData.prueba,
          distancia: formData.distancia,
          tiempo: formData.tiempo,
          lugar: formData.lugar || undefined,
          evento: formData.evento || undefined,
          notas: formData.notas || undefined,
          linkVideo: formData.linkVideo || undefined,
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

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

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="fecha"
            className="block text-sm font-medium text-dark mb-2"
          >
            Fecha <span className="text-primary">*</span>
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.fecha ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.fecha && (
            <p className="mt-1 text-sm text-red-600">{errors.fecha}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="prueba"
            className="block text-sm font-medium text-dark mb-2"
          >
            Nombre de la prueba <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="prueba"
            name="prueba"
            value={formData.prueba}
            onChange={handleChange}
            placeholder="Ej: Competencia Regional"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.prueba ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.prueba && (
            <p className="mt-1 text-sm text-red-600">{errors.prueba}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="distancia"
            className="block text-sm font-medium text-dark mb-2"
          >
            Distancia <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="distancia"
            name="distancia"
            value={formData.distancia}
            onChange={handleChange}
            placeholder="Ej: 500m, 1000m"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.distancia ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.distancia && (
            <p className="mt-1 text-sm text-red-600">{errors.distancia}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="tiempo"
            className="block text-sm font-medium text-dark mb-2"
          >
            Tiempo <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="tiempo"
            name="tiempo"
            value={formData.tiempo}
            onChange={handleChange}
            placeholder="Ej: 45.2s, 1:23.45"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.tiempo ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.tiempo && (
            <p className="mt-1 text-sm text-red-600">{errors.tiempo}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="evento"
            className="block text-sm font-medium text-dark mb-2"
          >
            Evento (opcional)
          </label>
          <input
            type="text"
            id="evento"
            name="evento"
            value={formData.evento}
            onChange={handleChange}
            placeholder="Ej: Campeonato Nacional"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label
            htmlFor="lugar"
            className="block text-sm font-medium text-dark mb-2"
          >
            Lugar (opcional)
          </label>
          <input
            type="text"
            id="lugar"
            name="lugar"
            value={formData.lugar}
            onChange={handleChange}
            placeholder="Ej: Bogotá, Colombia"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="linkVideo"
          className="block text-sm font-medium text-dark mb-2"
        >
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

      <div>
        <label
          htmlFor="notas"
          className="block text-sm font-medium text-dark mb-2"
        >
          Notas (opcional)
        </label>
        <textarea
          id="notas"
          name="notas"
          value={formData.notas}
          onChange={handleChange}
          rows={3}
          placeholder="Observaciones, condiciones, etc."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">
            Hubo un error al guardar la entrada. Por favor intenta de nuevo.
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <CTAButton
          type="submit"
          variant="primary"
          size="lg"
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar entrada"}
        </CTAButton>
        <CTAButton
          type="button"
          variant="outline"
          size="lg"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </CTAButton>
      </div>
    </form>
  );
}
