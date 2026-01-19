"use client";

import { useState } from "react";
import Section from "./Section";
import CTAButton from "./CTAButton";
import FormAddHistoryEntry from "./FormAddHistoryEntry";

export interface AthleteBasicInfo {
  nombre: string;
  edadCategoria: string;
  ciudad: string;
  club?: string;
  email?: string;
  whatsapp?: string;
}

export interface HistoryEntry {
  fecha: string;
  prueba: string;
  distancia: string;
  tiempo: string;
  lugar?: string;
  evento?: string;
  notas?: string;
  linkVideo?: string;
}

interface AthleteProfileProps {
  athleteInfo: AthleteBasicInfo;
  initialHistory?: HistoryEntry[];
}

export default function AthleteProfile({
  athleteInfo,
  initialHistory = [],
}: AthleteProfileProps) {
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleHistoryAdded = (newEntry: HistoryEntry) => {
    setHistory([newEntry, ...history].sort((a, b) => 
      new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    ));
    setShowAddForm(false);
  };

  // Calcular estadísticas
  const getBestTimeByDistance = () => {
    const bestTimes: Record<string, { tiempo: string; fecha: string }> = {};
    
    history.forEach((entry) => {
      const dist = entry.distancia;
      if (!bestTimes[dist] || entry.tiempo < bestTimes[dist].tiempo) {
        bestTimes[dist] = { tiempo: entry.tiempo, fecha: entry.fecha };
      }
    });
    
    return bestTimes;
  };

  const getMonthlyAverage = () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    const lastMonthEntries = history.filter((entry) => {
      const entryDate = new Date(entry.fecha);
      return entryDate >= lastMonth;
    });

    if (lastMonthEntries.length === 0) return null;

    // Calcular promedio de tiempos (simplificado - asume formato "XX.XXs")
    const times = lastMonthEntries
      .map((e) => parseFloat(e.tiempo.replace(/[^\d.]/g, "")))
      .filter((t) => !isNaN(t));

    if (times.length === 0) return null;

    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    return avg.toFixed(2);
  };

  const bestTimes = getBestTimeByDistance();
  const monthlyAvg = getMonthlyAverage();

  return (
    <div className="space-y-8">
      {/* Información básica */}
      <Section background="white" padding="md">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-heading font-bold text-dark mb-4">
              {athleteInfo.nombre}
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <span className="font-semibold">Categoría:</span> {athleteInfo.edadCategoria}
              </div>
              <div>
                <span className="font-semibold">Ciudad:</span> {athleteInfo.ciudad}
              </div>
              {athleteInfo.club && (
                <div>
                  <span className="font-semibold">Club:</span> {athleteInfo.club}
                </div>
              )}
              {athleteInfo.email && (
                <div>
                  <span className="font-semibold">Email:</span> {athleteInfo.email}
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Estadísticas */}
      {(Object.keys(bestTimes).length > 0 || monthlyAvg) && (
        <Section background="dark" padding="md">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-heading font-bold text-white mb-6">
              Estadísticas
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.keys(bestTimes).length > 0 && (
                <div className="bg-white/10 p-6 rounded-lg">
                  <h4 className="text-lg font-heading font-bold text-primary mb-4">
                    Mejores Marcas
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(bestTimes).map(([dist, { tiempo, fecha }]) => (
                      <div key={dist} className="text-gray-200">
                        <span className="font-semibold">{dist}:</span> {tiempo} 
                        <span className="text-sm text-gray-400 ml-2">
                          ({new Date(fecha).toLocaleDateString("es-CO")})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {monthlyAvg && (
                <div className="bg-white/10 p-6 rounded-lg">
                  <h4 className="text-lg font-heading font-bold text-primary mb-4">
                    Promedio del Mes
                  </h4>
                  <p className="text-3xl font-bold text-white">{monthlyAvg}s</p>
                  <p className="text-sm text-gray-300 mt-2">
                    Basado en {history.filter((e) => {
                      const entryDate = new Date(e.fecha);
                      const lastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
                      return entryDate >= lastMonth;
                    }).length} entradas
                  </p>
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Agregar entrada */}
      <Section background="white" padding="md">
        <div className="max-w-4xl mx-auto">
          {!showAddForm ? (
            <div className="text-center">
              <CTAButton
                onClick={() => setShowAddForm(true)}
                variant="primary"
                size="lg"
              >
                Agregar entrada al historial
              </CTAButton>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-heading font-bold text-dark mb-6">
                Nueva entrada
              </h3>
              <FormAddHistoryEntry
                athleteInfo={athleteInfo}
                onSuccess={handleHistoryAdded}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}
        </div>
      </Section>

      {/* Historial */}
      <Section background="white" padding="md">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-heading font-bold text-dark mb-6">
            Historial de Competencias
          </h3>
          {history.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">
                Aún no hay entradas en el historial.
              </p>
              <CTAButton
                onClick={() => setShowAddForm(true)}
                variant="primary"
                size="md"
              >
                Agregar primera entrada
              </CTAButton>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="border-l-4 border-primary bg-gray-50 p-6 rounded-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-heading font-bold text-dark">
                        {entry.prueba}
                      </h4>
                      {entry.evento && (
                        <p className="text-gray-600 text-sm">{entry.evento}</p>
                      )}
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-sm text-gray-500">
                        {new Date(entry.fecha).toLocaleDateString("es-CO", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-gray-600">Distancia:</span>
                      <p className="font-semibold text-dark">{entry.distancia}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Tiempo:</span>
                      <p className="font-semibold text-primary text-lg">
                        {entry.tiempo}
                      </p>
                    </div>
                    {entry.lugar && (
                      <div>
                        <span className="text-sm text-gray-600">Lugar:</span>
                        <p className="font-semibold text-dark">{entry.lugar}</p>
                      </div>
                    )}
                  </div>
                  {entry.notas && (
                    <p className="text-gray-700 mb-3">{entry.notas}</p>
                  )}
                  {entry.linkVideo && (
                    <a
                      href={entry.linkVideo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Ver video →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
