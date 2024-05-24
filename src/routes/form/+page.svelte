<script lang="ts">
  import { goto } from "$app/navigation";

  export let data;
  let { supabase } = data;
  $: ({ supabase, session } = data);

  let tipo = "";
  let sub_tipo = "";
  let sensor:any = null;
  let sensor_entrada:any = null;
  let sensor_salida:any = null;
  let desviacion_maxima = 0;
  let tiempo_en_ese_estado = 0;
 $: console.log(tipo);
 $: console.log(sub_tipo);
 $: console.log(sensor);
 $: console.log(sensor_entrada);
 $: console.log(sensor_salida);
 $: console.log(desviacion_maxima);
 $: console.log(tiempo_en_ese_estado);

 async function  optionsenums () {
// Vincular los valores al desplegable y hacer lo mismo en vista de alerts---- Guardar todo en un solo objeto para utilizarlo en ambos codigos
    let tps = await supabase.rpc('enum_range', { type: 'types' })
    let stps = await supabase.rpc('enum_range', { type: 'sub_types' })
    let sensors = await supabase.rpc('enum_range', { type: 'sensors' })
    console.log(tps.data);
    console.log(stps.data);
    console.log(sensors.data);
  }
   const reset = () =>{
    tipo = "";
    sub_tipo = "";
    sensor = "";
    sensor_entrada = "";
    sensor_salida = "";
    desviacion_maxima = 0;
    tiempo_en_ese_estado = 0;
  }
  optionsenums()
  async function saveAlert() {
    const { data: alerts,error  } = await supabase.from("alerts").insert({
      tipo,
      sub_tipo,
      sensor,
      sensor_entrada,
      sensor_salida,
      desviacion_maxima,
      tiempo_en_ese_estado
    })
    if (error) {
        console.error('Error fetching alerts:', error);;
    // goto("/viewAlerts");
  }
  }
</script>
<section class="min-h-screen bg-cover bg-center bg-base-300 ">
  <div class="flex flex-col items-center justify-center h-full">
    <form novalidate class="w-full max-w-md">
      <h3 class="text-2xl font-bold mt-4">Tipo de Alerta</h3>
      <div class="flex flex-row">
        <div class="form-control mb-4 basis-1/2">
          <label class="label" for="tipo">Tipo </label>
          <select id="tipo" name="tipo" class="select select-bordered" bind:value={tipo}
            required>
            <option value="Conductividad">Conductividad</option>
            <option value="Conductividad 2">Conductividad 2</option>
            <option value="pH">pH</option>
          </select>
        </div>
        <div class="form-control mb-4 basis-1/2">
          <label class="label" for="sub_tipo">Sub_tipo de Alerta</label>
          <select id="sub_tipo" name="sub_tipo" class="select select-bordered"bind:value={sub_tipo} required>
            <option value="Desviacion Max">Desviacion Max</option>
            <option value="Desviacion Min">Desviacion Min</option>
            <option value="Valor Max">Valor Max</option>
            <option value="Valor Min">Valor Min</option>
          </select>
        </div>
      </div>
        {#if sub_tipo == "Valor Max" || sub_tipo == "Valor Min"} 
        <!--  DESPUES DARLE DINAMISMO CON {} A LOS VALORES DEL GET -->
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
        
        {:else}
      <div class="form-control mb-4">
        <label class="label" for="sensor">Sensor</label>
        <select id="sensor" name="sensor" class="select select-bordered" bind:value={sensor} >
          <option value=null></option>
          <option value="Sensor 1">Sensor 1</option>
          <option value="Sensor 2">Sensor 2</option>
          <option value="Sensor 3">Sensor 3</option>
          <option value="Sensor 4">Sensor 4</option>
        </select>
        
      </div>
      {/if}
      <div>
        
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


<!-- 
create type types as enum (
  'Conductividad',
  'pH',
);
create type sub_Types as enum (
  'Desviacion Max',
  'Desviacion Min',
  'Valor Max',
  'Valor Min',
);
create type sensors as enum (
  'Sensor 1',
  'Sensor 2',
  'Sensor 3',
  'Sensor 4',
  'Sensor 5',
  'Sensor 6',
); -->
