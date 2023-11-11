<template>
	<div>
		<div
			class="flex grid md:grid-cols-5 max-md:grid-cols-2 md:gap-5 max-md:gap-1"
			v-if="datas.length != 0"
		>
			<NuxtLink
				v-for="i in datas"
				class="cursor-pointer"
				:to="`/selected/${i.id}`"
			>
				<CardSecond :product="i" />
			</NuxtLink>
		</div>
		<div class="h-64 w-full flex justify-center items-center" v-else>
			<p class="text-gray-600 text-xl font-black">Data Kosong</p>
		</div>
	</div>
</template>
<script type="text/javascript" setup>
const props = defineProps({
	datas: Object,
});
</script>
