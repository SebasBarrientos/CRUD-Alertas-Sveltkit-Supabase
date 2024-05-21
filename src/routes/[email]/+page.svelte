<!-- <script lang="ts" context="module">
    export let data;
    let { supabase, session } = data;
    export async function load() {
        const { data:dataSensor } = await supabase.from("alerts").select("*");
        {
            console.log(data);
        }
        return {
            props:{
                dataSensor
            }
        };
    }

</script> -->

<script lang="ts">
    export let data;
    let { supabase, session } = data;
    $: ({ supabase, session } = data);
    import { page } from "$app/stores";

    $: email = $page.params.email;
    // export let dataSensor;
    // async function savealerts() {
    //     const alertsDataSearch = await supabase.from("alerts").select("*");
    //     const alertsData = alertsDataSearch;
    //     return alertsData.data[0].sensor;

    // }
    // $: sensorData = await savealerts()
    // console.log(savealerts());
    $: alertsFetched = "cargando"
    export async function load() {
        const { data:alerts } = await supabase.from("alerts").select("*");
        console.log(alerts[0]);
        alertsFetched = alerts[0].sensor
       
        // return {
        //     alerts: alerts ?? [],
        // };
    }
    const test = load()
    console.log(alertsFetched);
    
</script>

<div class="hero min-h-screen bg-base-300">
    <div class="hero-content">
        <div class="max-w-md text-center">
            <h1 class="text-white font-bold text-4xl">{email}</h1>
            <ul>
                <li>{alertsFetched}</li>
            </ul>
        </div>
    </div>
</div>
