#!/bin/bash

# Script para procesar y organizar assets de logo
# Uso: ./scripts/process-assets.sh

echo "🚀 Procesando assets de Roller Track X"
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que existe la carpeta assets
if [ ! -d "assets" ]; then
    echo -e "${RED}❌ No se encontró la carpeta assets/${NC}"
    exit 1
fi

# Crear carpetas de destino si no existen
mkdir -p public/images/logo
mkdir -p public/images/brand

echo -e "${YELLOW}📁 Assets encontrados en assets/:${NC}"
ls -lh assets/*.png 2>/dev/null || echo "No se encontraron archivos PNG"

echo ""
echo -e "${YELLOW}📝 INSTRUCCIONES:${NC}"
echo ""
echo "1. Revisa cada PNG en assets/ y determina qué contiene:"
echo "   - ¿Es logo horizontal, vertical o icono?"
echo "   - ¿Qué tamaño tiene?"
echo ""
echo "2. Para cada logo, necesitas crear:"
echo "   - logo-horizontal.png (para Header)"
echo "   - logo-vertical.png (para Footer)"
echo "   - logo-icon.png (para favicon, 32x32 o 64x64px)"
echo ""
echo "3. Optimiza las imágenes:"
echo "   - Usa TinyPNG: https://tinypng.com/"
echo "   - O Squoosh: https://squoosh.app/"
echo ""
echo "4. Copia los archivos optimizados a:"
echo "   - public/images/logo/logo-horizontal.png"
echo "   - public/images/logo/logo-vertical.png"
echo "   - public/images/logo/logo-icon.png"
echo ""
echo "5. Crea og-image.png (1200x630px) y colócalo en:"
echo "   - public/images/brand/og-image.png"
echo ""
echo -e "${GREEN}✅ Estructura de carpetas creada${NC}"
echo ""
echo "Carpetas listas:"
echo "  📁 public/images/logo/"
echo "  📁 public/images/brand/"
echo ""
