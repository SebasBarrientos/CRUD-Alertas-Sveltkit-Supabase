<script lang="ts">
  import { goto } from "$app/navigation";

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

   const reset = () =>{
    tipo_alerta = "";
    subtipo_alerta = "";
    sensor = "";
    sensor_entrada = "";
    sensor_salida = "";
    desviacion_maxima = 0;
    tiempo_en_ese_estado = 0;
  }
  async function saveAlert() {
    await supabase.from("alerts").insert({
      tipo_alerta,
      subtipo_alerta,
      sensor,
      sensor_entrada,
      sensor_salida,
      desviacion_maxima,
      tiempo_en_ese_estado,
    });
    goto("/viewAlerts");
  }

</script>
<section class="min-h-screen bg-cover bg-center bg-base-300 ">
  <div class="flex flex-col items-center justify-center h-full">
    <form novalidate class="w-full max-w-md">
      <h3 class="text-2xl font-bold mt-4">Tipo de Alerta</h3>
      <div class="flex flex-row">
        <div class="form-control mb-4 basis-1/2">
          <label class="label" for="tipo_alerta">Tipo </label>
          <select id="tipo_alerta" name="tipo_alerta" class="select select-bordered" bind:value={tipo_alerta}
            required>
            <option value="Conductividad">Conductividad</option>
            <option value="Conductividad 2">Conductividad 2</option>
            <option value="pH">pH</option>
          </select>
        </div>
        <div class="form-control mb-4 basis-1/2">
          <label class="label" for="subtipo_alerta">Subtipo de Alerta</label>
          <select id="subtipo_alerta" name="subtipo_alerta" class="select select-bordered"bind:value={subtipo_alerta} required>
            <option value="Desviacion Max">Desviacion Max</option>
            <option value="Desviacion Min">Desviacion Min</option>
            <option value="Valor Min">Valor Max</option>
            <option value="Valor Min">Valor Min</option>
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
            <input  type="text" id="sensor_entrada" name="sensor_entrada" class="input input-bordered" bind:value={sensor_entrada} />
          </div>
          <div class="form-control mb-4">
            <label class="label" for="sensor_salida">Sensor de Salida</label>
            <input type="text" id="sensor_salida" name="sensor_salida" class="input input-bordered" bind:value={sensor_salida}/>  
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control mb-4">
            <label class="label" for="desviacion_maxima" >Desviación Máxima</label >   
            <input type="number" id="desviacion_maxima" name="desviacion_maxima" class="input input-bordered" bind:value={desviacion_maxima}/>
          </div>
          <div class="form-control mb-4">
            <label class="label" for="tiempo_en_ese_estado">Tiempo en ese Estado</label>
            <input type="number" id="tiempo_en_ese_estado" name="tiempo_en_ese_estado" class="input input-bordered" bind:value={tiempo_en_ese_estado}/>
          </div>
        </div>

        <button class="btn btn-neutral  m-2" on:click={saveAlert}>Guardar</button>
        <button class="btn m-2" on:click={reset}>Resetear</button>
      </div>
    </form>
  </div>
</section>

<style>
</style>
