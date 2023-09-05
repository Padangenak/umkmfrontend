<template>
	<div class="border border-gray-100 rounded hover:border-gray-400">
		<!-- {{ props.product }} -->
		<div
			class="max-md:h-[20vh] md:h-[40vh] bg-cover bg-center rounded-t"
			:style="{
				'background-image': `url(${STORAGE_API}/${props.product.attachment.filename})`,
			}"
		></div>
		<div class="px-3 py-2">
			<small class="leading-none line-clamp-2 h-7">{{
				props.product.product
			}}</small>
			<div v-if="props.product.discon == 0">
				<p class="text-base text-red-600 leading-none">
					{{ rupiah(props.product.price)
					}}<small class="text-gray-600"
						>/{{ type(props.product.type) }}</small
					>
				</p>
			</div>
			<div v-else>
				<p class="text-sm text-gray-400 leading-none line-through">
					{{ rupiah(props.product.price) }}
					<small class="">/pcs</small>
				</p>
				<p class="text-base text-red-600 leading-none">
					{{ rupiah(discon(props.product.price)) }}
					<small class="text-gray-600">/pcs</small>
					<span
						class="text-xs bg-red-600 text-white px-1 mx-2"
						v-if="props.product.discon != 0"
						>{{ props.product.discon }}%</span
					>
				</p>
			</div>
			<small
				>{{ props.product.user.store }} ({{
					props.product.user.address
				}})</small
			>
		</div>
	</div>
	<!-- {{ props.product }} -->
	<!-- <pre>{{ props.product.active }}</pre> -->
</template>
<script type="text/javascript" setup>
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
