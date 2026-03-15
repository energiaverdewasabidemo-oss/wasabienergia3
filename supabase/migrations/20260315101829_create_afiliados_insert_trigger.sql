/*
  # Trigger para insertar afiliado al crear usuario en Auth

  ## Problema resuelto
  El insert manual desde el cliente fallaba porque la RLS requiere sesión activa (authenticated),
  pero justo tras signUp() la sesión puede no estar disponible aún (si la confirmación de email
  está activada en el proyecto Supabase).

  ## Solución
  Un trigger AFTER INSERT en auth.users que llama a una función con SECURITY DEFINER
  (ejecutada con privilegios de servicio), insertando automáticamente la fila en afiliados
  usando los datos pasados en raw_user_meta_data durante el signUp().

  ## Cambios
  - Nueva función: `handle_new_afiliado()` - inserta en afiliados si raw_user_meta_data contiene 'ref'
  - Nuevo trigger: `on_auth_user_created_afiliado` en auth.users

  ## Notas importantes
  - La función usa SECURITY DEFINER para eludir RLS y ejecutar con permisos de postgres
  - Solo inserta si el usuario tiene 'ref' en su metadata (distingue afiliados de otros usuarios)
  - Usa ON CONFLICT DO NOTHING para evitar errores si el afiliado ya existe
*/

CREATE OR REPLACE FUNCTION public.handle_new_afiliado()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ref text;
  v_nombre text;
BEGIN
  v_ref := NEW.raw_user_meta_data->>'ref';
  v_nombre := NEW.raw_user_meta_data->>'nombre';

  IF v_ref IS NOT NULL AND v_ref <> '' THEN
    INSERT INTO public.afiliados (id, email, nombre, ref)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(v_nombre, ''),
      v_ref
    )
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_afiliado ON auth.users;

CREATE TRIGGER on_auth_user_created_afiliado
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_afiliado();
