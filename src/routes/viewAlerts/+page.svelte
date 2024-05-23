<script lang="ts">
    
  export let data;
  let { supabase } = data;
  let alertsFetched: any[] | null = [];
  let loading: boolean = true;
  $: ({ supabase, session } = data);

  export async function load() {
      const { data: alerts,error  } = await supabase.from("alerts").select("*");
      loading= false;
      alertsFetched= alerts;
      if (error) {
        console.error('Error fetching alerts:', error);
        alertsFetched = null;
      } else {
        alertsFetched = alerts;
  }}

  load();
  let showUpdate = false;
  let idAlertUpdate:number;
  let tipo_alerta = "";
  let subtipo_alerta = "";
  let sensor = "";
  let sensor_entrada = "";
  let sensor_salida = "";
  let desviacion_maxima = 0;
  let tiempo_en_ese_estado = 0;

  const update = (id:number) =>{
        showUpdate = true
        idAlertUpdate = id
    }
    const reset = () =>{
    tipo_alerta = "";
    subtipo_alerta = "";
    sensor = "";
    sensor_entrada = "";
    sensor_salida = "";
    desviacion_maxima = 0;
    tiempo_en_ese_estado = 0;
  }

  async function updateAlert(id) {
    await supabase.from("alerts").update({
        tipo_alerta,
        subtipo_alerta,
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
    <div class="min-h-screen bg-base-200">
      <div class="container mx-auto px-4 ">
        <div class="flex flex-col lg:flex-row justify-center items-center">
          <div>
              {#if showUpdate}
                <div class="flex flex-col items-center justify-center h-full">
                  <form novalidate class="w-full max-w-md">
                    <h3 class="text-2xl font-bold mt-4">Actualizar Alerta</h3>
                    <div class="flex flex-row">
                      <div class="form-control mb-4 basis-1/2">
                        <label class="label" for="tipo_alerta">Tipo </label>
                        <select id="tipo_alerta" name="tipo_alerta" class="select select-bordered" bind:value={tipo_alerta} required>
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
                
                        <button class="btn btn-neutral  m-2" on:click={()=>updateAlert(idAlertUpdate)}>Guardar</button>
                        <button class="btn m-2" on:click={reset}>Resetear</button>
                      </div>
                  </form>
                </div>
              {:else}
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
                            <th class="text-sm">SubTipo</th>
                            <th class="text-sm">Valor</th>
                            <th class="text-sm">Estado</th>
                            <th class="text-sm">Editar</th>
                          </tr>
                        </thead>
                          {#each alertsFetched as alert}
                          <tbody>
                            <tr>
                              <td class="text-sm">{alert.tipo_alerta}</td>
                              <td class="text-sm">{alert.subtipo_alerta}</td>
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
              {/if}                   
          </div>
        </div>
      </div>
    </div>
</main>

<style>

</style>
