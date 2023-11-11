<template>
	<div class="border border-gray-100 rounded hover:border-gray-400">
		<!-- {{ props.product }} -->
		<div
			class="max-md:h-[30vh] md:h-[40vh] bg-cover bg-center rounded-t"
			:style="{
				'background-image': `url(${STORAGE_API}/${props.product.attachment.filename})`,
			}"
		></div>
		<div class="px-3 py-2">
			<small class="leading-none line-clamp-2 h-7">{{
				props.product.product
			}}</small>
			<div v-if="props.product.discon == 0">
				<div class="text-base text-red-600 leading-none flex items-center">
					<p class="font-semibold">{{ rupiah(props.product.price) }}</p>
					<small class="text-gray-600"
						>/{{ props.product.category.category }}</small
					>
				</div>
			</div>
			<div v-else>
				<div class="text-sm text-gray-400 leading-none line-through flex items-center">
					<p>{{ rupiah(props.product.price) }}</p>
					<small class="text-gray-600">/{{ props.product.category.category }}</small>
				</div>
				<div class="text-base text-red-600 leading-none flex items-center">
					<p class="font-semibold">{{ rupiah(discon(props.product.price)) }}</p>
					<small class="text-gray-600">/{{ props.product.category.category }}</small>
					<span
						class="text-xs bg-red-600 text-white px-1 mx-2"
						v-if="props.product.discon != 0"
						>{{ props.product.discon }}%</span
					>
				</div>
			</div>
			<small>{{ props.product.user.store }}</small>
			<br>
			<div class="flex gap-1 text-gray-700 text-sm">
				<LocationOutline class="w-3" />
			<small class="">{{props.product.user.address}}</small>
			</div>
		</div>
	</div>
	<!-- {{ props.product }} -->
	<!-- <pre>{{ props.product.active }}</pre> -->
</template>
<script type="text/javascript" setup>
import { LocationOutline } from "@vicons/ionicons5";

const props = defineProps({
	product: Object,
});
const { STORAGE_API } = apiData();
const rupiah = (number) => {	
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(number);
};
const discon = (val) => {
	if (val != null) {
		let discon = (val * props.product.discon) / 100;
		return val-discon;
	}
};
const type = (type) => {
	let split = type.split("/");
	return split[split.length - 1];
};
</script>
