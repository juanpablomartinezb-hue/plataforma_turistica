# DOCUMENTO MAESTRO — PLATAFORMA TURÍSTICA

**Versión:** 1.0  
**Estado:** Documento de planificación y arquitectura  
**Idioma inicial:** Español  
**Segundo idioma previsto:** Inglés  
**Marca comercial:** Provisional; deberá poder modificarse desde una configuración central.

---

## 1. Objetivo del proyecto

Construir una plataforma profesional de comercialización y administración de servicios turísticos, con dos canales principales:

- **B2C:** sitio público para que los clientes consulten y reserven servicios.
- **B2B:** portal privado para agencias de viajes y distribuidores.

La plataforma deberá contar con un administrador central desde el cual se controlen proveedores, servicios, tarifas, disponibilidad, reservaciones, pagos, comisiones, contenido y notificaciones.

El sistema debe poder crecer sin tener que reconstruirse desde cero.

## 2. Principios de arquitectura

1. Utilizar una base de datos centralizada.
2. Mantener una sola estructura base para los registros de servicios y proveedores.
3. Utilizar un campo configurable de tipo para clasificar cada registro.
4. Utilizar una plantilla maestra para presentar todos los servicios.
5. Centralizar configuraciones para evitar cambios repetitivos en distintas páginas.
6. Mantener separados los datos, la lógica del sistema y la presentación visual.
7. Preparar la arquitectura para español e inglés desde el inicio.
8. No duplicar productos para manejar diferentes idiomas.
9. Evitar dependencias innecesarias y costos difíciles de prever.
10. Proteger la información y mantener respaldos del proyecto.

## 3. Categorías comerciales

La plataforma comercializará:

- Day Pass
- Tours
- Actividades

Estas son las categorías comerciales principales. No deben confundirse con el campo de tipo del establecimiento o proveedor.

El campo **Tipo** permitirá clasificar los registros, por ejemplo:

- Hotel
- Beach Club
- Tour
- Cenote
- Parque
- Marina
- Restaurante
- Otro tipo configurable

El administrador podrá agregar nuevos tipos sin modificar código.

## 4. Registro único de servicios

Todos los registros partirán de una misma estructura base. No se crearán estructuras independientes para proveedores y productos sin una necesidad técnica justificada.

Cada registro podrá contener:

- Identidad y nombre comercial.
- Razón social.
- Tipo de establecimiento o servicio.
- Categoría comercial.
- Destino y ubicación.
- Información de contacto.
- Descripciones.
- Galería de fotografías.
- Paquetes y modalidades.
- Tarifas.
- Disponibilidad y capacidad.
- Condiciones y políticas.
- Documentos.
- Información interna.
- Estado de publicación.

## 5. Administración central

El administrador deberá permitir:

- Crear, editar y consultar registros.
- Activar, ocultar, pausar, guardar como borrador y archivar.
- Administrar proveedores y servicios.
- Administrar destinos y tipos.
- Configurar comisiones.
- Administrar tarifas y temporadas.
- Administrar inventario y disponibilidad.
- Consultar reservaciones.
- Gestionar documentos.
- Configurar notificaciones.
- Consultar historial de cambios.

Los estados principales serán:

- Activo.
- Oculto.
- Pausado.
- Borrador.
- Archivado.

Ocultar un servicio deberá retirarlo de los canales públicos B2C y B2B.

## 6. Identidad, contenido y SEO

Cada registro deberá incluir:

- Nombre comercial.
- Razón social.
- URL o slug automático, con posibilidad de modificarlo.
- Destino principal.
- Destino secundario opcional.
- Cadena o independiente.
- Número de estrellas, cuando corresponda.
- Tipo de establecimiento o servicio.
- Descripción corta de hasta 500 caracteres.
- Descripción extensa.
- Título SEO.
- Descripción SEO.
- Contenido en español e inglés.

Los campos en inglés podrán permanecer vacíos inicialmente. En ese caso, el sistema utilizará el contenido en español como alternativa.

Si se modifica una URL, el sistema deberá permitir conservar redirecciones desde la URL anterior.

## 7. Fotografías y galería

Cada servicio tendrá una galería general.

El administrador podrá:

- Subir fotografías.
- Seleccionar fotografía de portada.
- Cambiar el orden.
- Eliminar fotografías.
- Editar textos alternativos.
- Guardar cambios de manera independiente.

### Optimización automática obligatoria

Al subir una fotografía, el sistema deberá:

1. Comprimirla sin perder calidad visual innecesariamente.
2. Convertirla preferentemente a WebP o formato moderno compatible.
3. Generar tamaños adecuados para portada, galería y miniaturas.
4. Generar nombres de archivo descriptivos y amigables para SEO.
5. Permitir texto ALT.
6. Mostrar el peso final del archivo.
7. Advertir si una fotografía sigue siendo demasiado pesada.
8. Utilizar carga diferida (lazy loading) cuando corresponda.

El objetivo es evitar que las fotografías ralenticen el sitio.

## 8. Contactos y notificaciones

Todos los campos de contacto serán opcionales inicialmente:

- Correo principal.
- Correos adicionales.
- Teléfono principal.
- Teléfonos adicionales.
- WhatsApp principal.
- WhatsApps adicionales.

El administrador central podrá decidir qué contactos reciben cada tipo de notificación.

Los canales serán configurables por proveedor y por tipo de aviso:

- Correo electrónico.
- WhatsApp.
- Ambos.

Las notificaciones podrán dirigirse al cliente, al proveedor y a la plataforma.

## 9. Paquetes y modalidades

Un mismo servicio podrá tener diferentes paquetes o modalidades.

Ejemplos:

- Day Pass de 8:00 a 17:00.
- Night Pass de 17:00 a 00:00.
- Sunset Pass.
- Tour con salida a las 9:00, 12:00 y 15:00.

Cada modalidad podrá tener sus propios:

- Horarios.
- Días de operación.
- Tarifas.
- Categorías de edad.
- Capacidad.
- Disponibilidad.

## 10. Categorías de edad

El sistema manejará cuatro categorías:

- Adultos.
- Juniors.
- Menores con costo.
- Menores sin costo.

Cada categoría tendrá un rango mínimo y máximo de edad.

Las categorías activas y sus rangos se configurarán por servicio o paquete, no de manera global para todo un hotel.

Cada categoría activa podrá tener:

- Precio público.
- Precio neto.
- Comisión de la plataforma.

Un servicio podrá ser exclusivo para adultos o utilizar cualquier combinación de categorías.

## 11. Tarifas, temporadas y promociones

El sistema deberá permitir tarifas variables según:

- Temporadas.
- Rangos de fechas.
- Días de la semana.
- Días festivos.
- Promociones.
- Categorías de edad.
- Modalidades o paquetes.

Se podrán programar varias tarifas futuras al mismo tiempo.

Las promociones deberán formar parte del calendario de tarifas y no funcionar como descuentos independientes que puedan provocar conflictos.

El sistema deberá tener reglas de prioridad para resolver correctamente tarifas que coincidan en las mismas fechas.

Cada tarifa deberá considerar precio público, precio neto y comisión.

## 12. Comisiones

Existirá una comisión predeterminada de la plataforma, configurable desde los ajustes generales.

Cada servicio podrá tener una comisión particular.

Si el servicio no tiene una comisión específica, se utilizará la comisión general.

El cálculo deberá ser consistente y visible para el administrador.

## 13. Disponibilidad e inventario

B2C y B2B compartirán el mismo inventario.

La capacidad podrá configurarse por:

- Día.
- Día de la semana.
- Modalidad.
- Horario.
- Salida o sesión.
- Fecha específica.

También se podrá establecer:

- Máximo de personas por reservación.
- Máximo de personas por día.
- Capacidad por horario.
- Bloqueos de fechas.
- Excepciones de calendario.

El sistema deberá soportar proveedores con capacidades diferentes según el día y el horario.

Una reservación pendiente de pago no deberá descontar inventario.

La confirmación de una reservación deberá descontar inventario de forma segura para evitar sobreventas.

## 14. Reservaciones y validación

Una reservación sin pago será considerada pendiente, no confirmada.

No se eliminarán automáticamente las reservaciones pendientes por el simple paso del tiempo.

Las reservaciones pendientes deberán revalidarse periódicamente para comprobar que las tarifas y la disponibilidad siguen vigentes.

- Frecuencia inicial de revisión: cada 2 horas.
- La frecuencia deberá poder configurarse.
- Si cambia la tarifa o disponibilidad, se notificará al administrador y a la agencia.
- No se cambiará silenciosamente una tarifa que ya fue aceptada.
- El pago quedará bloqueado hasta que la agencia acepte las nuevas condiciones.

Antes del pago deberá realizarse una validación final de tarifa e inventario.

Si otra reservación pagada ocupa los lugares disponibles, la reservación pendiente deberá marcarse como no disponible o requerir revisión. Nunca deberá cobrarse ni confirmarse sin disponibilidad.

## 15. Modalidades de pago

El sistema contemplará tres modalidades:

1. **Pago en destino:** el cliente realiza un pago anticipado a la plataforma y cubre el saldo restante directamente con el proveedor.
2. **Pago completo en línea:** el cliente paga el total mediante la plataforma.
3. **Pago 100% en destino:** el cliente no realiza pago en línea.

La modalidad podrá configurarse por servicio.

La arquitectura deberá permitir integrar pasarelas de pago sin tener que reconstruir el sistema.

## 16. Monedas

La moneda predeterminada será MXN.

Se deberá contemplar la posibilidad de manejar USD y otras monedas posteriormente.

La moneda podrá configurarse por servicio.

## 17. Condiciones y políticas

Cada servicio podrá tener sus propias condiciones:

- Cancelaciones.
- Modificaciones.
- Reembolsos.
- Restricciones.
- Horarios y reglas de operación.
- Notas internas.

Cada condición podrá clasificarse como pública o interna.

Las políticas públicas aceptadas por el cliente o agencia deberán conservarse como una copia histórica en la reservación, incluyendo:

- Política aceptada.
- Versión.
- Fecha y hora de aceptación.
- Condiciones de cancelación, modificación y reembolso.

Las modificaciones posteriores a una política no deberán alterar las condiciones aceptadas en reservaciones anteriores.

## 18. Documentos

Cada servicio podrá tener documentos adjuntos:

- Tarifarios.
- Contratos.
- Convenios.
- Fichas técnicas.
- Políticas.
- Menús.
- Programas.
- Material comercial.

Los documentos deberán clasificarse como internos o autorizados para consulta pública o B2B.

Se deberá conservar la fecha de carga y permitir reemplazar documentos manteniendo un control de versiones.

## 19. Portal B2B

El portal B2B permitirá a las agencias autorizadas:

- Iniciar sesión.
- Consultar servicios.
- Consultar tarifas netas y comisiones.
- Consultar disponibilidad.
- Realizar reservaciones.
- Consultar el estado de sus reservaciones.
- Acceder a fotografías y materiales autorizados.
- Consultar documentos comerciales.
- Gestionar sus clientes y operaciones según los permisos asignados.

La arquitectura deberá permitir posteriormente funciones de marca blanca.

El inventario será compartido con B2C, nunca independiente.

## 20. Idiomas

El sistema comenzará en español, pero deberá estar preparado para inglés desde su arquitectura inicial.

Se utilizará un solo registro de servicio con campos traducibles.

No se duplicará el catálogo por idioma.

La estructura deberá permitir traducir navegación, categorías, fichas, formularios, mensajes, reservaciones y portal B2B.

## 21. Seguridad y control

El sistema deberá contemplar:

- Autenticación de usuarios.
- Roles y permisos.
- Protección de información comercial.
- Separación de información pública e interna.
- Control de acceso a documentos.
- Historial de modificaciones.
- Respaldos de información.

Las contraseñas y credenciales nunca deberán almacenarse en archivos públicos del proyecto.

## 22. Criterios de desarrollo

El desarrollo se realizará por etapas.

Primero se priorizará la funcionalidad y la estabilidad. El diseño visual se perfeccionará posteriormente.

Se utilizará una plantilla maestra para las fichas de servicios. Las mejoras realizadas en la plantilla deberán aplicarse de forma centralizada.

El sistema deberá probarse antes de avanzar a la siguiente etapa.

No se eliminarán ni reemplazarán las páginas de prueba existentes sin una razón técnica y un respaldo previo.

Se priorizarán herramientas con costos iniciales bajos y una ruta clara de crecimiento.

---

**Este documento es la referencia principal del proyecto.** Las decisiones técnicas deberán respetar estos requisitos. Cualquier modificación importante deberá actualizarse aquí antes de implementarse.
