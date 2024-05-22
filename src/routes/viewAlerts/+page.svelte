<script lang="ts">
    export let data
    // /[email]/$types.js;
    let { supabase } = data;
    $: ({ supabase, session } = data);
    import { page } from "$app/stores";

    $: email = $page.params.email;

    $: alertsFetched = "cargando";
    export async function load() {
        const { data: alerts } = await supabase.from("alerts").select("*");
        console.log(alerts);
        alertsFetched = alerts;
        console.log(alertsFetched);
    }
    const test = load();
</script>

<main>
    <div class="hero min-h-screen bg-base-300">
        <div class="hero-content">
            <div class="max-w-md text-center">
                <h1 class="text-white font-bold text-4xl">Alertas:</h1>
                <div>
                    {#each alertsFetched as alert}
                        <ul class="alert">
                            <li>{alert.tipo_alerta}</li>
                            <li>{alert.subtipo_alerta}</li>
                            <li>{alert.desviacion_maxima}</li>
                            <li>{alert.estado}</li>
                        </ul>
                        <!-- <li>{alertsFetched||"cargando"}</li> -->
                    {/each}
                </div>
            </div>

            
        </div>
    </div>
</main>

<style>
    .alert {
        display: flex;
    }
</style>
