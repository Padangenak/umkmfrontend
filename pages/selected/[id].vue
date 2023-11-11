<template>
	<div class="md:pb-20">
		<div class="w-full">
			<nav class="max-md:px-5 md:px-20 py-10">
				<NuxtLink to="/" class="text-2xl font-black w-fit">
					UMKM AJAIB
				</NuxtLink>
			</nav>
			<div class="w-full md:flex">
				<div class="md:w-6/12 max-md:px-5 md:px-20 md:pb-10">
					<div class="flex items-center justify-center w-full">
						<div
							class="h-96 w-full max-md:my-5 md:my-12 bg-gray-200 skeleton"
							v-if="loading"
						/>
						<div class="md:h-[70vh] max-md:h-[40vh] flex items-center overflow-hidden" v-else>
							<img
								:src="`${STORAGE_API}/${datas.attachment.filename}`"
								class="max-md:py-5 md:py-12 rounded h-auto"
								v-if="selected.name == ''"
							/>
							<img
								:src="`${STORAGE_API}/${datas.attachment.filename}`"
								class="max-md:py-5 md:py-12 rounded h-auto"
								v-else-if="selected.attachment.length == 0"
							/>
							<img
								:src="`${STORAGE_API}/${selected.currentImage}`"
								class="max-md:py-5 md:py-12 rounded h-auto"
								v-else
							/>
						</div>
					</div>
					<div
						class="w-full flex flex-wrap gap-1 justify-center py-5"
						v-if="selected.name != ''"
					>
						<div
							v-for="i in selected.attachment"
							class="md:w-2/12 md:h-20 max-md:w-14 max-md:h-14 bg-cover bg-center rounded cursor-pointer"
							:class="{
								'border-4 border-red-600':
									selected.currentImage == i.filename,
							}"
							:style="{
								'background-image': `url('${STORAGE_API}/${i.filename}')`,
							}"
							@click="selected.currentImage = i.filename"
						/>
					</div>
				</div>

				<div class="md:w-6/12 max-md:px-10 md:py-14">
					<div
						class="text-xl font-bold text-gray-900 max-md:mt-4 md:mb-4"
					>
						<div
							class="h-6 w-4/12 skeleton rounded"
							v-if="loading"
						/>
						<p v-else>{{ datas.product }}</p>
					</div>
					<!-- <div class="flex gap-3 items-center">
						<div
							class="flex items-center gap-2 border-r-2 pr-3 border-gray-600"
						>
							<Star class="w-4 text-red-600" />
							<p>4.5/5</p>
						</div>
						<div
							class="flex gap-2 items-center border-r-2 pr-3 border-gray-600"
						>
							<PersonAdd class="w-4 text-red-600" />
							<div class="flex items-center">
								<p>10</p>
								<small>&nbsp Responden</small>
							</div>
						</div>
						<div class="flex gap-2 items-center">
							<BagSharp class="w-4 text-red-600" />
							<div class="flex items-center">
								<p>10</p>
								<small>&nbsp Stok</small>
							</div>
						</div>
					</div> -->

					<div class="max-md:py-1 md:py-2" v-if="loading">
						<div class="px-3 py-2 rounded w-fit">
							<div class="flex gap-5 items-center">
								<div class="w-12 h-12 rounded-full skeleton" />
								<div class="w-20 h-4 rounded skeleton" />
							</div>
						</div>
					</div>
					<div class="max-md:py-1 md:py-2 w-fit" v-else>
						<NuxtLink
							:to="`/person/${datas.user.id}`"
							class="cursor-pointer"
						>
							<div
								class="hover:bg-gray-200 px-3 py-2 rounded w-fit"
							>
								<div class="flex gap-5 items-center">
									<div
										class="w-12 h-12 rounded-full bg-cover bg-center"
										:style="{
											'background-image': `url('${STORAGE_API}/${datas.user.attachment.filename}')`,
										}"
									/>
									<div>{{ datas.user.store }}</div>
								</div>
							</div>
						</NuxtLink>
					</div>

					<div>
						<div class="skeleton w-52 h-10" v-if="loading" />
						<div
							v-else
							class="py-5 text-2xl text-red-600 font-black md:flex items-center gap-5"
						>
							<p
								class="text-base text-gray-400 font-normal line-through"
								v-if="datas.discon != 0"
							>
								{{ rupiah(datas.price) }}
							</p>
<!-- 							<p class="" v-if="datas.discon == 0">
								{{ rupiah(datas.price) }}
								<small class="text-sm">
									/{{ category(datas.category) }}
								</small>
							</p> -->
							<p class="" >
								{{ rupiah(discon(datas.price)) }}
								<small class="text-sm">
									/{{ category(datas.category) }}
								</small>
								<span
								class="text-sm bg-red-600 text-white px-2 ml-3"
								v-if="datas.discon != 0"
								>{{ datas.discon }}%</span
							>
							</p>
							
						</div>
						<div>
							<table>
								<tr v-if="datas.discon != 0">
									<td class="pr-10 py-3"><p>Diskon</p></td>
									<td class="pr-10 py-3">
										<div
											class="w-32 h-5 skeleton rounded"
											v-if="loading"
										/>
										<p v-else>{{ datas.discon }}%</p>
									</td>
								</tr>
								<tr>
									<td class="pr-10 py-3"><p>Tempat</p></td>
									<td class="pr-10 py-3">
										<div
											class="w-32 h-5 skeleton rounded"
											v-if="loading"
										/>
										<p v-else>{{ datas.user.address }}</p>
									</td>
								</tr>
								<tr>
									<td class="pr-10 py-3"><p>Variasi</p></td>
									<td class="pr-10 py-3">
										<div class="flex gap-3" v-if="loading">
											<div
												class="w-28 h-5 skeleton rounded"
												v-if="loading"
											/>
											<div
												class="w-28 h-5 skeleton rounded"
												v-if="loading"
											/>
										</div>
										<div
											class="flex flex flex-wrap gap-3"
											v-else
										>
											<button
												v-for="i in datas.variant"
												class="border border-black px-2 rounded transition"
												:class="{
													'bg-red-600 text-white border-red-600':
														selected.name ==
														i.variant,
												}"
												@click="
													selectedVarint(i.variant)
												"
											>
												{{ i.variant }}
											</button>
										</div>
									</td>
								</tr>
								<tr>
									<td class="pr-10 py-3"><p>Deskripsi</p></td>
									<td class="pr-10 py-3">
										<div>
											<div
												class="h-20 skeleton rounded"
												v-if="loading"
											/>
											<p v-else>
												{{ datas.description }}
											</p>
										</div>
									</td>
								</tr>
								<tr>
									<td class="pr-10 py-3"><p>Order</p></td>
									<td class="pr-10 py-3">
										<div v-if="loading">
											<div
												class="h-10 w-32 skeleton rounded"
											/>
										</div>
										<div v-else class="w-fit">
											<NuxtLink
												:to="`https://wa.me/${datas.user.phone_number}?text=Assalamu'alaikum,%20saya%20tertarik%20dengan%20barang%20anda(${datas.product}),%20apakah%20stoknya%20masih%20ada?`"
												:src="`${STORAGE_API}/${datas.attachment.filename}`"
												target="_blank"
												@click="countOne"
											>
												<button
													class="bg-[#2ab13f] px-3 py-2 flex gap-2 items-center text-white rounded shadow"
												>
													<LogoWhatsapp class="w-6" />
													<p>{{ datas.user.name }}</p>
												</button>
											</NuxtLink>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript" setup>
import { Star, PersonAdd, BagSharp, LogoWhatsapp } from "@vicons/ionicons5";
import { ref, watch } from "vue";

const { ROUTE_LIST, STORAGE_API } = apiData();
const route = useRoute();
const loading = ref(false);
const selected = ref({ name: "", attachment: [], currentImage: "" });
let datas = ref({
	active: null,
	attachment: {
		id: null,
		filename: null,
		path: null,
	},
	count: 0,
	description: null,
	discon: null,
	id: null,
	price: null,
	product: null,
	category: null,
	user: {
		id: null,
		name: null,
		address: null,
		phone_number: null,
		store: null,
		attachment: {
			filename: null,
			path: null,
		},
	},
	user_id: null,
	variant: [],
});

watch(
	datas,
	async () => {
		loading.value = true;
		await $fetch(`${ROUTE_LIST.PRODUCT_ID}${route.params.id}`)
			.then((val) => {
				console.log(val)
				datas.value.active = val.data.active;
				datas.value.attachment.id = val.data.attachment.id;
				datas.value.attachment.filename = val.data.attachment.filename;
				datas.value.attachment.path = val.data.attachment.path;
				datas.value.count = val.data.count;
				datas.value.description = val.data.description;
				datas.value.discon = val.data.discon;
				datas.value.id = val.data.id;
				datas.value.price = val.data.price;
				datas.value.product = val.data.product;
				datas.value.category = val.data.category.category;
				datas.value.user.address = val.data.user.address;
				datas.value.user.id = val.data.user.id;
				datas.value.user.name = val.data.user.name;
				datas.value.user.store = val.data.user.store;
				datas.value.user.phone_number = val.data.user.phone_number;
				datas.value.user.attachment.filename =
					val.data.user.attachment.filename;
				datas.value.user.attachment.path = val.data.user.attachment.path;
				datas.value.user_id = val.data.user_id;
				datas.value.variant.push(...val.data.variant);
			})
			.then(() => (loading.value = false));
	},
	{ immediate: true },
);
const rupiah = (number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(number);
};
const discon = (val) => {
	if (val != null) {
		let discon = (val * datas.value.discon) / 100;
		return val-discon;
	}
};
const category = (val) => {
	if (val != null) {
		let split = val.split("/");
		return split[split.length - 1];
	}
};
const selectedVarint = (val) => {
	if (val != selected.value.name) {
		selected.value.name = val;
		selected.value.attachment = [];
		for (let i in datas.value.variant) {
			if (datas.value.variant[i].variant == val) {
				selected.value.attachment.push(
					...datas.value.variant[i].attachment,
				);
				break;
			}
		}
		selected.value.currentImage = selected.value.attachment[0].filename;
	} else {
		selected.value.name = "";
		selected.value.currentImage = "";
		selected.value.attachment = [];
	}
};
const countOne = async () => {
	await $fetch(`${ROUTE_LIST.PRODUCT_COUNT_POST}${datas.value.id}/count`);
};
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
