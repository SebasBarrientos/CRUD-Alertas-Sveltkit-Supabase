<script lang="ts">
    export let data;
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


//crear 4 variables y luego usar bind con los inputs y guardar

</script>

<main>
    <div class="hero min-h-screen bg-base-300">
        <div class="hero-content">
            <div class="max-w-md text-center">
                <h1 class="text-white font-bold text-4xl">formulario:</h1>
                <div>
                    <ul class="alert">
                        <li><input type="text"></li>
                        <li><input type="text"></li>
                        <li><input type="text"></li>
                        <li><input type="text"></li>
                    </ul>
                    <!-- <li>{alertsFetched||"cargando"}</li> -->
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    /* .alert {
        display: flex;
    } */
</style>
