<script lang="ts">
    export let data;
    let { supabase } = data;
    $: ({ supabase, session } = data);

    let tipo_alerta = "";
    let subtipo_alerta = "";
    let sensor = "";
    let sensor_entrada = "";
    let sensor_salida = "";
    let desviacion_maxima = 0;
    let tiempo_en_ese_estado = 0;

    async function saveAlert() {
        console.log(tipo_alerta,subtipo_alerta,sensor,sensor_entrada,sensor_salida);
        
        const { data, error } = await supabase.from("alerts").insert({
            tipo_alerta,
            subtipo_alerta,
            sensor,
            sensor_entrada,
            sensor_salida,
            desviacion_maxima,
            tiempo_en_ese_estado,
        });
        console.log(data);
        
    }
$: console.log(tipo_alerta);

    // y luego usar bind con los inputs y guardar
</script>
<!-- 
<section class="hero min-h-screen bg-cover bg-center bg-base-300">
    <div class="container mx-auto px-4">
      <div class="hero-content flex flex-col items-center justify-center h-full">
        <h1 class="text-4xl font-bold mb-8">Formulario:</h1>
        <form novalidate class="w-full max-w-md">
          <div class="form-control mb-4">
            <label class="label" for="tipo_alerta">Tipo de Alerta</label>
            <input type="text" id="tipo_alerta" name="tipo_alerta" class="input input-bordered" bind:value={tipo_alerta} required />
          </div>
          <div class="form-control mb-4">
            <label class="label" for="subtipo_alerta">Subtipo de Alerta</label>
            <input type="text" id="subtipo_alerta" name="subtipo_alerta" class="input input-bordered" bind:value={subtipo_alerta} required />
          </div>
          <div class="form-control mb-4">
            <label class="label" for="sensor">Sensor</label>
            <input type="text" id="sensor" name="sensor" class="input input-bordered" bind:value={sensor}  />
          </div>
          <div class="form-control mb-4">
            <label class="label" for="sensor_entrada">Sensor de Entrada</label>
            <input type="text" id="sensor_entrada" name="sensor_entrada" class="input input-bordered" bind:value={sensor_entrada}  />
          </div>
          <div class="form-control mb-4">
            <label class="label" for="sensor_salida">Sensor de Salida</label>
            <input type="text" id="sensor_salida" name="sensor_salida" class="input input-bordered" bind:value={sensor_salida}  />
          </div>
          <div class="form-control mb-4">
            <label class="label" for="desviacion_maxima">Desviación Máxima</label>
            <input type="text" id="desviacion_maxima" name="desviacion_maxima" class="input input-bordered" bind:value={desviacion_maxima}  />
          </div>
          <div class="form-control mb-4">
            <label class="label" for="tiempo_en_ese_estado">Tiempo en ese Estado</label>
            <input type="text" id="tiempo_en_ese_estado" name="tiempo_en_ese_estado" class="input input-bordered" bind:value={tiempo_en_ese_estado}  />
          </div>
          <button class="btn btn-primary" on:click={saveAlert}>Enviar Formulario</button>
        </form>
      </div>
    </div>
  </section> -->
  <section class="hero min-h-screen bg-cover bg-center bg-base-300">
    <div class="container mx-auto px-4">
      <div class="hero-content flex flex-col items-center justify-center h-full">
          <h1 class="text-4xl font-bold mb-2 mt-20">Formulario de Alerta:</h1>
          <form novalidate class="w-full max-w-md">
            <div class="flex justify-content "></div>
            <h3 class="text-2xl">Tipo de Alerta</h3>
            <div class="flex flex-row">
                
                <div class="form-control mb-4 basis-1/2">
                    <label class="label" for="tipo_alerta">Tipo </label>
                    <select id="tipo_alerta" name="tipo_alerta" class="select select-bordered" bind:value={tipo_alerta} required>
                        <option value="Conductividad">Conductividad</option>
                        <option value="Conductividad 2">Conductividad 2</option>
                    </select>
                </div>
                
                <div class="form-control mb-4 basis-1/2">
                    <label class="label" for="subtipo_alerta">Subtipo de Alerta</label>
                    <select id="subtipo_alerta" name="subtipo_alerta" class="select select-bordered" bind:value={subtipo_alerta} required>
                        <option value="Desviacion Max">Desviacion Max</option>
                        <option value="Desviacion Min">Desviacion Min</option>
                    </select>
                </div>
            </div>
                
                <div class="form-control mb-4">
            <label class="label" for="sensor">Sensor</label>
            <select id="sensor" name="sensor" class="select select-bordered" bind:value={sensor} >
              <option value=""></option>
              <option value="Sensor 1">Sensor 1</option>
              <option value="Sensor 2">Sensor 2</option>
              <option value="Sensor 3">Sensor 3</option>
              <option value="Sensor 4">Sensor 4</option>
              </select>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control mb-4">
              <label class="label" for="sensor_entrada">Sensor de Entrada</label>
              <input type="text" id="sensor_entrada" name="sensor_entrada" class="input input-bordered" bind:value={sensor_entrada}  />
            </div>
            <div class="form-control mb-4">
              <label class="label" for="sensor_salida">Sensor de Salida</label>
              <input type="text" id="sensor_salida" name="sensor_salida" class="input input-bordered"  bind:value={sensor_salida}  />
            </div>
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control mb-4">
              <label class="label" for="desviacion_maxima">Desviación Máxima</label>
              <input type="number" id="desviacion_maxima" name="desviacion_maxima" class="input input-bordered" bind:value={desviacion_maxima} />
            </div>
            <div class="form-control mb-4">
              <label class="label" for="tiempo_en_ese_estado">Tiempo en ese Estado</label>
              <input type="number" id="tiempo_en_ese_estado" name="tiempo_en_ese_estado" class="input input-bordered" bind:value={tiempo_en_ese_estado} />
            </div>
          </div>
  
          <button class="btn btn-primary" on:click={saveAlert}>Guardar</button>
        </form>
      </div>
    </div>
  </section>
<style>

</style>
