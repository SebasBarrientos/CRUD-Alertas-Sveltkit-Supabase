<script lang="ts">
    export let data;
    
    let { supabase } = data;
    $: ({ supabase, session } = data);
    
    import { page } from '$app/stores';
    $: userId = $page?.data?.state?.userId
    let idAlertUpdate =userId;
    
    let tipo= null;
    let sub_tipo= null;
    let sensor = null;
    let sensor_entrada = null;
    let sensor_salida = null;
    let desviacion_maxima = 0;
    let tiempo_en_ese_estado = 0;
    let enums = {};
    $: loading= true

    async function  optionsenums () {
    let enumTypes = await supabase.rpc('enum_range', { type: 'types' })
    let enumSub_type = await supabase.rpc('enum_range', { type: 'sub_types' })
    let enumSensors = await supabase.rpc('enum_range', { type: 'sensors' })
    enums = {
      type: enumTypes.data,
      sub_type: enumSub_type.data,
      sensors: enumSensors.data
    }
    loading= false;
    }
    optionsenums()
    const reset = () =>{
    tipo = null;
    sub_tipo = null;
    sensor = null;
    sensor_entrada = null;
    sensor_salida = null;
    desviacion_maxima = 0;
    tiempo_en_ese_estado = 0;
  }
    async function updateAlert(idAlertUpdate) {
        
        const { data: alerts,error  } = await supabase.from("alerts").update({
            tipo,
            sub_tipo,
            sensor,
            sensor_entrada,
            sensor_salida,
            desviacion_maxima,
            tiempo_en_ese_estado
      }).eq("id",idAlertUpdate)
    if (error) {
        console.error('Error fetching alerts:', error);;
    // goto("/viewAlerts");
  }
  //   reset()
}
</script>

<main>


    <section class="min-h-screen bg-cover bg-center bg-base-300 ">
        <div class="flex flex-col items-center justify-center h-full">
          {#if loading}
          <div class="flex justify-center items-center h-screen">
            <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
          </div>
          {:else}
          <form novalidate class="w-full max-w-md">
            <h3 class="text-2xl font-bold mt-4">Tipo de Alerta</h3>
            <div class="flex flex-row">
              <div class="form-control mb-4 basis-1/2">
                <label class="label" for="tipo">Tipo </label>
                <select id="tipo" name="tipo" class="select select-bordered" bind:value={tipo}
                  required>
                  {#each enums.type as type }
                    
                  <option value="{type}">{type}</option>
                  {/each}
                </select>
              </div>
              <div class="form-control mb-4 basis-1/2">
                <label class="label" for="sub_tipo">Sub_tipo de Alerta</label>
                <select id="sub_tipo" name="sub_tipo" class="select select-bordered"bind:value={sub_tipo} required>
                  {#each enums.sub_type as sub_type }
                    
                  <option value="{sub_type}">{sub_type}</option>
                  {/each}
                </select>
              </div>
            </div>
              {#if sub_tipo == "Valor Max" || sub_tipo == "Valor Min"} 
              <!--  DESPUES DARLE DINAMISMO CON {} A LOS VALORES DEL GET -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-control mb-4">
                  <label class="label" for="sensor_entrada">Sensor de Entrada</label>
                  <select id="sensor_entrada" name="sensor_entrada" class="select select-bordered" bind:value={sensor_entrada} > 
                    {#each enums.sensors as sensor}
                    <option value="{sensor}">{sensor}</option>
                  {/each}
                  </select>            
                </div>
                <div class="form-control mb-4">
                  <label class="label" for="sensor_salida">Sensor de Salida</label>
                  <select id="sensor_salida" name="sensor_salida" class="select select-bordered" bind:value={sensor_salida} > 
                    {#each enums.sensors as sensor}
                    <option value="{sensor}">{sensor}</option>
                  {/each}
                  </select>            
                </div>
              </div>        
              {:else}
            <div class="form-control mb-4">
              <label class="label" for="sensor">Sensor</label>
              <select id="sensor" name="sensor" class="select select-bordered" bind:value={sensor} >
                {#each enums.sensors as sensor }
                  <option value="{sensor}">{sensor}</option>
                {/each}
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
                
                        <button class="btn btn-neutral  m-2" on:click={()=>updateAlert(idAlertUpdate)}>Guardar</button>
                        <button class="btn m-2" on:click={reset}>Resetear</button>
                    </div>
                </form>
                {/if}
              </div>
            </section>
            
</main>