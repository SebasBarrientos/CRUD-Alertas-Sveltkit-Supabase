<script lang="ts">
    
  export let data;
  let { supabase } = data;
  let alertsFetched= [];
  let loading: boolean = true;
  $: ({ supabase, session } = data);
  let enums = {};
  async function  optionsEnums () {
    let enumTypes = await supabase.rpc('enum_range', { type: 'types' })
    let enumSub_type = await supabase.rpc('enum_range', { type: 'sub_types' })
    let enumSensors = await supabase.rpc('enum_range', { type: 'sensors' })
    enums = {
      type: enumTypes.data,
      sub_type: enumSub_type.data,
      sensors: enumSensors.data
    }
  }
 optionsEnums()
  export async function load() {
    const { data: alerts,error  } = await supabase.from("alerts").select("*");
      loading= false;
      alertsFetched= alerts;
      if (error) {
        console.error('Error fetching alerts:', error);
        alertsFetched = null;
      } else {
        alertsFetched = alerts;
  }

};
  load();
  let showUpdate = false;
  let idAlertUpdate;
  let tipo: string | null= null;
  let sub_tipo: string | null= null;
  let sensor: string | null = null;
  let sensor_entrada: string | null = null;
  let sensor_salida: string | null = null;
  let desviacion_maxima: number | null = 0;
  let tiempo_en_ese_estado: number | null = 0;

  const update = (id) =>{

        showUpdate = true
        idAlertUpdate = id
    }
    const reset = () =>{
    tipo = null;
    sub_tipo = null;
    sensor = null;
    sensor_entrada = null;
    sensor_salida = null;
    desviacion_maxima = 0;
    tiempo_en_ese_estado = 0;
  }

  async function updateAlert(id) {
    await supabase.from("alerts").update({
        tipo,
        sub_tipo,
        sensor,
        sensor_entrada,
        sensor_salida,
        desviacion_maxima,
        tiempo_en_ese_estado,
      }).eq("id",id)
      load()
      reset()
      showUpdate=false;
  }
</script>

<main>
    {#if showUpdate}
    <section class="min-h-screen bg-cover bg-center">
      <div class="flex flex-col items-center justify-center h-full">
        {#if loading}
        <div class="flex justify-center items-center h-screen">
          <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>
        {:else}
        <form novalidate class="">
          <div class="card mt-5 shadow-md rounded-lg">
          <h3 class="card-header bg-base-300 font-bold rounded-t p-3">Tipo de Alerta</h3>
          <div class="card-body p-2">
            <div class="form-control mb-2 basis-1/2">
              <label class="label" for="tipo">Tipo </label>
              <select id="tipo" name="tipo" class="select select-bordered" bind:value={tipo}
                required>
                {#each enums.type as type }
                  
                <option value="{type}">{type}</option>
                {/each}
              </select>
            </div>
            <div class="form-control mb-2 basis-1/2">
              <label class="label" for="sub_tipo">Subtipo</label>
              <select id="sub_tipo" name="sub_tipo" class="select select-bordered"bind:value={sub_tipo} required>
                {#each enums.sub_type as sub_type }
                  
                <option value="{sub_type}">{sub_type}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
        <div class="card mt-5 shadow-md rounded-lg">
          <h3 class="card-header bg-base-300 font-bold rounded-t p-3">Valores de la alerta</h3>
          <div class="card-body p-2">
            {#if sub_tipo == "Valor Max" || sub_tipo == "Valor Min"} 
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control mb-2">
                <label class="label" for="sensor_entrada">Sensor de Entrada</label>
                <select id="sensor_entrada" name="sensor_entrada" class="select select-bordered" bind:value={sensor_entrada} > 
                  {#each enums.sensors as sensor}
                  <option value="{sensor}">{sensor}</option>
                {/each}
                </select>            
              </div>
              <div class="form-control mb-2">
                <label class="label" for="sensor_salida">Sensor de Salida</label>
                <select id="sensor_salida" name="sensor_salida" class="select select-bordered" bind:value={sensor_salida} > 
                  {#each enums.sensors as sensor}
                  <option value="{sensor}">{sensor}</option>
                {/each}
                </select>            
              </div>
            </div>        
            {:else}
          <div class="form-control mb-2">
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
              <div class="form-control mb-2">
                <label class="label" for="desviacion_maxima" >Desviación Máxima</label >   
                <input type="number" id="desviacion_maxima" name="desviacion_maxima" class="input input-bordered" bind:value={desviacion_maxima}/>
              </div>
              <div class="form-control mb-2">
                <label class="label" for="tiempo_en_ese_estado">Tiempo en ese Estado</label>
                <input type="number" id="tiempo_en_ese_estado" name="tiempo_en_ese_estado" class="input input-bordered" bind:value={tiempo_en_ese_estado}/>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div class="flex justify-around items-center bg-base-300 font-bold rounded-lg  mx-10 mb-4 mt-5">
          <button class="btn btn-neutral  m-2" on:click={()=>updateAlert(idAlertUpdate)}>Guardar</button>
          <button class="btn m-2" on:click={reset}>Resetear</button>
          </div>
        </form>
        {/if}
    </section>
        {:else}
          <div class="min-h-screen bg-base-200">
            <div class="container mx-auto px-4 ">
              <div class="flex flex-col lg:flex-row justify-center items-center">
                <div>
          {#if loading}
          <div class="flex justify-center items-center h-screen">
            <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
          </div>
          {:else}
          <div class="card mt-8 shadow-md rounded-lg">
              <div class="card-header bg-base-300 font-bold rounded-t p-3">Alertas</div>
                <div class="card-body p-2">
                  <table class="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th class="text-sm">Tipo</th>
                        <th class="text-sm">Sub_Tipo</th>
                        <th class="text-sm">Valor</th>
                        <th class="text-sm">Estado</th>
                        <th class="text-sm">Editar</th>
                      </tr>
                    </thead>
                      {#each alertsFetched as alert}
                      <tbody>
                        <tr>
                          <td class="text-sm">{alert.tipo}</td>
                          <td class="text-sm">{alert.sub_tipo}</td>
                          <td class="text-sm">{alert.desviacion_maxima}</td>
                          <td class="text-sm text-primary">{alert.estado}</td>
                          <td>
                          <button class="btn btn-sm btn-neutral" on:click={()=>update(alert.id)}>Editar</button>
                        </td>
                      </tr>
                    </tbody>
                  {/each}
                  </table>
              </div>
          </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
  {/if}                   
</main>

<style>

</style>
