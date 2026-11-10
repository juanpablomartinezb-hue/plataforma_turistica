// ========================================
// AUTENTICACIÓN ADMINISTRATIVA
// EXPLORA - Supabase Auth
// ========================================

window.adminAuth = {

  // Iniciar sesión con correo y contraseña
  async iniciarSesion(correo, password) {
    const { data, error } =
      await window.supabaseClient.auth.signInWithPassword({
        email: correo,
        password: password
      });

    if (error) throw error;

    return data;
  },

  // Enviar correo para recuperar contraseña
  async recuperarPassword(correo) {
    const { data, error } =
      await window.supabaseClient.auth.resetPasswordForEmail(
        correo,
        {
          redirectTo:
            "https://plataformaturistica.vercel.app/admin/restablecer-password.html"
        }
      );

    if (error) throw error;

    return data;
  },

  // Guardar una nueva contraseña
  async cambiarPassword(password) {
    const { data, error } =
      await window.supabaseClient.auth.updateUser({
        password: password
      });

    if (error) throw error;

    return data;
  },

  // Cerrar sesión
  async cerrarSesion() {
    const { error } =
      await window.supabaseClient.auth.signOut();

    if (error) throw error;
  },

  // Comprobar que exista una sesión administrativa
  async verificarAdministrador() {
    const { data, error } =
      await window.supabaseClient.auth.getUser();

    if (error || !data.user) return false;

    const { data: roles, error: errorRoles } =
      await window.supabaseClient
        .from("platform_user_roles")
        .select("role, is_active")
        .eq("user_id", data.user.id)
        .eq("role", "platform_admin")
        .eq("is_active", true);

    if (errorRoles) throw errorRoles;

    return roles.length > 0;
  }

};

console.log("Módulo de autenticación administrativa cargado.");
