
/* =====================================================
   EXPLORA — PLANTILLA MAESTRA DE PRODUCTOS
   DAY PASS · TOURS · ACTIVIDADES
   ===================================================== */

(function () {

    "use strict";

    function escaparHTML(valor) {
        return String(valor || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function crearLista(items) {
        if (!Array.isArray(items) || items.length === 0) {
            return "<p>Información próximamente.</p>";
        }

        return "<ul>" + items.map(function (item) {
            return "<li>" + escaparHTML(item) + "</li>";
        }).join("") + "</ul>";
    }

    function crearPaquetes(paquetes) {
        if (!Array.isArray(paquetes) || paquetes.length === 0) {
            return "<p>Paquetes próximamente.</p>";
        }

        return paquetes.map(function (paquete) {
            return `
                <article class="paquete-producto">
                    <h3>${escaparHTML(paquete.nombre)}</h3>
                    <p>${escaparHTML(paquete.descripcion)}</p>
                    <strong>${escaparHTML(paquete.precio)}</strong>
                </article>
            `;
        }).join("");
    }

    function renderizarProducto(producto) {

        if (!producto || !producto.nombre) {
            console.error("EXPLORA: faltan datos del producto.");
            return;
        }

        const main = document.querySelector("main");

        if (!main) {
            console.error("EXPLORA: no se encontró el elemento main.");
            return;
        }

        const fotos = Array.isArray(producto.fotos)
            ? producto.fotos
            : [];

        const fotoPrincipal = fotos[0] || "";

        main.className = "detalle-producto " +
            escaparHTML(producto.clase || "");

        main.innerHTML = `

            <div class="contenedor">

                <p class="ruta">
                    <a href="/">Inicio</a> /
                    ${escaparHTML(producto.categoria)} /
                    ${escaparHTML(producto.destino)}
                </p>

                <section class="producto-encabezado">

                    <div>
                        <span class="tipo-producto">
                            ${escaparHTML(producto.categoria)}
                        </span>

                        <h1>${escaparHTML(producto.nombre)}</h1>

                        <p class="ubicacion-producto">
                            ${escaparHTML(producto.ubicacion)}
                        </p>
                    </div>

                    <div class="calificacion-producto">
                        ${escaparHTML(producto.calificacion || "Próximamente")}
                    </div>

                </section>

                <section class="galeria-producto">

                    <div class="galeria-principal">
                        <div
                            class="foto-principal"
                            id="foto-principal-producto"
                            role="button"
                            tabindex="0"
                            aria-label="Abrir galería">
                        </div>
                    </div>

                    <div
                        id="galeria-miniaturas"
                        class="galeria-miniaturas">
                    </div>

                </section>

                <div class="detalle-layout">

                    <section class="informacion-producto">

                        <nav class="navegacion-detalle">
                            <a href="#descripcion">Descripción</a>
                            <a href="#paquetes">Paquetes</a>
                            <a href="#servicios">Servicios</a>
                            <a href="#ubicacion">Ubicación</a>
                            <a href="#opiniones">Opiniones</a>
                        </nav>

                        <section id="descripcion">
                            <h2>Descripción</h2>
                            <p>${escaparHTML(producto.descripcion)}</p>
                        </section>

                        <section id="paquetes">
                            <h2>Paquetes disponibles</h2>
                            ${crearPaquetes(producto.paquetes)}
                        </section>

                        <section id="servicios">
                            <h2>Servicios incluidos</h2>
                            ${crearLista(producto.incluye)}

                            <h3>Servicios no incluidos</h3>
                            ${crearLista(producto.noIncluye)}
                        </section>

                        <section id="informacion-importante">
                            <h2>Información importante</h2>
                            ${crearLista(producto.informacion)}
                        </section>

                        <section id="ubicacion">
    <h2>Ubicación</h2>
    <p>${escaparHTML(producto.ubicacion || "Ubicación por confirmar")}</p>

    <div class="mapa-producto">
        Mapa de ubicación próximamente
    </div>
</section>
                        <section id="opiniones">
                            <h2>Opiniones</h2>
                            <p>
                                ${escaparHTML(
                                    producto.opiniones ||
                                    "Las opiniones estarán disponibles próximamente."
                                )}
                            </p>
                        </section>

                    </section>

                    <aside class="reserva-producto">

                        <span>
                            ${escaparHTML(
                                producto.etiquetaPrecio ||
                                "PRECIO DE DEMOSTRACIÓN"
                            )}
                        </span>

                        <div class="precio-detalle">
                            ${escaparHTML(producto.precio || "Por confirmar")}
                        </div>

                        <small>
                            ${escaparHTML(
                                producto.textoPrecio ||
                                "Precio ilustrativo"
                            )}
                        </small>

                        <div class="separador"></div>

                        <h3>
                            ${escaparHTML(
                                producto.tituloReserva ||
                                "Reserva tu producto"
                            )}
                        </h3>

                        <p>
                            ${escaparHTML(
                                producto.textoReserva ||
                                "Reservaciones próximamente."
                            )}
                        </p>

                        <button class="boton-reserva" disabled>
                            Próximamente
                        </button>

                    </aside>

                </div>

            </div>

            <div id="visor-galeria" class="visor-galeria">

                <button class="cerrar-galeria"
                        aria-label="Cerrar galería">×</button>

                <button class="flecha-galeria anterior"
                        aria-label="Fotografía anterior">
                    &#10094;
                </button>

                <img id="imagen-ampliada" src="" alt="">

                <button class="flecha-galeria siguiente"
                        aria-label="Fotografía siguiente">
                    &#10095;
                </button>

                <div id="contador-galeria"
                     class="contador-galeria"></div>

            </div>

        `;

        /* GALERÍA */

        const principal = document.getElementById(
            "foto-principal-producto"
        );

        const miniaturas = document.getElementById(
            "galeria-miniaturas"
        );

        const visor = document.getElementById("visor-galeria");

        const imagenAmpliada = document.getElementById(
            "imagen-ampliada"
        );

        const contador = document.getElementById(
            "contador-galeria"
        );

        let fotoActual = 0;

        function actualizarGaleria() {

            if (!fotos.length) return;

            imagenAmpliada.src = fotos[fotoActual];

            imagenAmpliada.alt =
                producto.nombre + " — fotografía " +
                (fotoActual + 1);

            contador.textContent =
                (fotoActual + 1) + " / " + fotos.length;
        }

        function abrirGaleria(indice) {

            if (!fotos.length) return;

            fotoActual = indice;
            actualizarGaleria();

            visor.classList.add("activo");
        }

        function cerrarGaleria() {
            visor.classList.remove("activo");
        }

        function cambiarFoto(direccion) {

            if (!fotos.length) return;

            fotoActual =
                (fotoActual + direccion + fotos.length) %
                fotos.length;

            actualizarGaleria();
        }

        if (fotoPrincipal) {
            principal.style.backgroundImage =
                "url('" + fotoPrincipal + "')";

            principal.addEventListener("click", function () {
                abrirGaleria(0);
            });

            principal.addEventListener("keydown", function (evento) {
                if (evento.key === "Enter") {
                    abrirGaleria(0);
                }
            });
        }

        fotos.slice(1, 3).forEach(function (foto, indice) {

            const miniatura = document.createElement("div");

            miniatura.className = "foto-miniatura";

            miniatura.style.backgroundImage =
                "url('" + foto + "')";

            miniatura.style.position = "relative";

            miniatura.addEventListener("click", function () {
                abrirGaleria(indice);
            });

            if (indice === 1 && fotos.length > 3) {

                const indicador = document.createElement("span");

                indicador.textContent =
                    "+" + (fotos.length - 2) + " fotos";

                indicador.style.cssText =
                    "position:absolute;bottom:0;left:0;width:100%;" +
                    "padding:12px 5px;background:rgba(0,0,0,0.6);" +
                    "color:white;text-align:center;font-size:15px;" +
                    "font-weight:bold;";

                miniatura.appendChild(indicador);
            }

            miniaturas.appendChild(miniatura);
        });

        visor.querySelector(".cerrar-galeria")
            .addEventListener("click", cerrarGaleria);

        visor.querySelector(".anterior")
            .addEventListener("click", function () {
                cambiarFoto(-1);
            });

        visor.querySelector(".siguiente")
            .addEventListener("click", function () {
                cambiarFoto(1);
            });

        document.addEventListener("keydown", function (evento) {

            if (!visor.classList.contains("activo")) return;

            if (evento.key === "Escape") cerrarGaleria();
            if (evento.key === "ArrowRight") cambiarFoto(1);
            if (evento.key === "ArrowLeft") cambiarFoto(-1);

        });

    }

    window.renderizarProductoEXPLORA = renderizarProducto;

    document.addEventListener("DOMContentLoaded", function () {

        if (window.productoEXPLORA) {
            renderizarProducto(window.productoEXPLORA);
        }

    });

})();

