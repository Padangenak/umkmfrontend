<template>
	<div class="md:pb-20">
		<div class="w-full max-md:px-2 md:px-20">
			<nav class="py-10 px-3">
				<NuxtLink to="/" class="text-2xl font-black w-fit">
					UMKM AJAIB
				</NuxtLink>
			</nav>
			<div class="w-full md:flex gap-16">
				<div class="flex justify-center">
					<div>
						<div
							v-if="loading"
							class="w-64 h-64 rounded-full bg-cover mb-5 bg-center skeleton"
						/>
						<div
							v-else
							class="w-64 h-64 rounded-full bg-cover mb-5 bg-center"
							:style="{
								'background-image': `url('${STORAGE_API}/${datas.attachment.filename}')`,
							}"
						/>
						<div class="mb-5 max-md:text-center" v-if="loading">
							<div class="skeleton w-32 h-8 mb-3"></div>
							<div class="skeleton w-52 h-8"></div>
						</div>
						<div class="mb-5 max-md:text-center" v-else>
							<p class="text-xl font-thin">{{ datas.store }}</p>
							<span class="text-gray-500 text-xl font-thin"
								>({{ datas.name }})</span
							>
						</div>
					</div>
					<!-- <button class="border w-full bg-red-500 text-white py-2 rounded shadow">Edit Profile</button> -->
				</div>
				<div
					class="flex grid max-md:grid-cols-2 md:grid-cols-4 w-full gap-5"
					v-if="loading"
				>
					<div v-for="i in 5" class="w-full">
						<div
							class="bg-gray-300 h-52 w-full rounded-t skeleton"
						/>
						<div class="px-2">
							<div
								class="w-full h-4 bg-gray-300 my-2 rounded skeleton"
							></div>
							<div
								class="w-full h-4 bg-gray-300 mt-3 rounded skeleton"
							></div>
							<div
								class="w-full h-3 bg-gray-300 my-2 rounded skeleton"
							></div>
						</div>
					</div>
				</div>
				<div
					class="flex grid md:grid-cols-3 max-md:grid-cols-2 w-full text-left md:gap-5 max-md:gap-1"
					v-else
				>
					<NuxtLink
						v-for="i in datas.product.more"
						class="border rounded hover:border-gray-400 cursor-pointer"
						:to="`/selected/${i.id}`"
					>
						<div
							:style="{
								'background-image': `url('${STORAGE_API}/${i.attachment.filename}')`,
							}"
							class="w-full max-md:h-[20vh] md:h-[40vh] bg-cover rounded-t bg-center"
						/>
						<div class="px-3 py-2">
							<small class="leading-none line-clamp-2 h-7">{{
								i.product
							}}</small>
							<div v-if="i.discon == 0">
								<p class="text-base text-red-600 leading-none">
									{{ rupiah(i.price) }}
									<small class="text-gray-600">/pcs</small>
								</p>
							</div>
							<div v-else>
								<p
									class="text-sm text-gray-400 leading-none line-through"
								>
									{{ rupiah(i.price) }}
									<small class="">/pcs</small>
								</p>
								<p class="text-base text-red-600 leading-none">
									{{ rupiah(discon(i)) }}
									<small class="text-gray-600">/pcs</small>
									<span
										class="text-xs bg-red-600 text-white px-1 mx-2"
										v-if="datas.discon != 0"
										>{{ i.discon }}%</span
									>
								</p>
							</div>
							<small
								>{{ datas.store }} ({{ datas.address }})</small
							>
						</div>
					</NuxtLink>
				</div>
			</div>
			<div class="flex justify-center mt-10">
				<Button
					outlined
					severity="danger"
					@click="loadMore"
					v-if="buttonLoadMore"
					>Load More</Button
				>
			</div>
		</div>
	</div>
</template>
//
<script type="text/javascript" setup>
// import { Star, PersonAdd, BagSharp, LogoWhatsapp } from "@vicons/ionicons5";
import { ref, watchEffect } from "vue";
import Button from "primevue/button";

const { ROUTE_LIST, STORAGE_API } = apiData();
const route = useRoute();
const loading = ref(false);
const buttonLoadMore = ref(true);
let datas = ref({
	address: null,
	attachment: {
		filename: null,
	},
	name: null,
	phone_number: null,
	product: {
		all: [],
		more: [],
	},
	store: null,
});

watchEffect(async () => {
	loading.value = true;
	await $fetch(`${ROUTE_LIST.USER_ID}${route.params.id}`)
		.then((val) => {
			console.log(val)
			datas.value.address = val.data.address;
			datas.value.attachment.filename = val.data.attachment.filename;
			datas.value.name = val.data.name;
			datas.value.phone_number = val.data.phone_number;
			datas.value.product.all.push(...val.data.product);
			datas.value.store = val.data.store;
		})
		.then(() => (loading.value = false));

	loadMore();
	
});
const rupiah = (number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(number);
};
const discon = (val) => {
	if (val != null) {
		let discon = (val.price * val.discon) / 100;
		return val.price - discon;
	}
};
function loadMore() {
	let number = datas.value.product.more.length;
	for (let i = number; i < number + 10; i++) {
		datas.value.product.all[i]
			? datas.value.product.more.push(datas.value.product.all[i])
			: "";
	}
	moreButton();
}
function moreButton() {
	if (datas.value.product.all.length <= datas.value.product.more.length) {
		buttonLoadMore.value = false;
	}
}
</script>
<style>
.skeleton {
	background: linear-gradient(0.25turn, transparent, #fff, transparent),
		linear-gradient(#eee, #eee);
	background-repeat: no-repeat;
	background-size: 200px 500px, 500px 500px, 100px 100px, 225px 30px;
	background-position: -315px 0, 0 0, 0px 190px, 50px 195px;
	animation: loading 1.5s infinite;
}
@keyframes loading {
	to {
		background-position: 315px 0, 0 0, 0 190px, 50px 195px;
	}
}
</style>
