<!-- components/contact/ContactInformationSection.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  mapEmbedUrl?: string
  addressTitle?: string
  address?: string
  phoneTitle?: string
  phone?: string
  emailTitle?: string
  emailinf?: string
}>(), {
  title: 'Contact information',
  // Replace with your institute’s Google Maps embed (no API key needed for basic embed)
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.969220009471!2d44.512!3d40.204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sA.%20Alikhanyan%20National%20Science%20Laboratory!5e0!3m2!1sen!2s!4v0000000000000',
  addressTitle: 'Our Address',
  address: '2 Alikhanyan Brothers Street,\n0036, Yerevan, Armenia',
  phoneTitle: 'Call Us',
  phone: '+(374)10 34 15 00',
  emailTitle: 'Send Email',
  emailinf: 'info@aanl.am'
})

/* Simple form state (plug into your API/Backend later) */
const name = ref('')
const email = ref('')
const message = ref('')
const sent = ref(false)
const sending = ref(false)
const error = ref<string | null>(null)

async function submit() {
  error.value = null
  sent.value = false
  // very light validation
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    error.value = 'Please fill in all fields.'
    return
  }
  sending.value = true
  try {
    // TODO: replace with your real API call
    await new Promise(r => setTimeout(r, 700))
    sent.value = true
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (e) {
    error.value = 'Something went wrong. Please try again.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section class="dark:bg-gray-950" aria-labelledby="contact-title">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <!-- Heading -->
      <div class="mb-6 sm:mb-8">
        <h2
          id="contact-title"
          class="inline-block text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white
                 relative
                 after:content-[''] after:block after:h-[3px] after:bg-gray-900 after:rounded-full after:mt-2"
        >
          {{ title }}
        </h2>
      </div>

      <!-- Card with form + map -->
      <div
        class="relative overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10
               shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
      >
        <div class="grid lg:grid-cols-12">
          <!-- Left: form panel -->
          <div class="lg:col-span-5 bg-[#F3F7FF] dark:bg-gray-900 p-6 sm:p-8 lg:p-10">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Get In Touch</h3>

            <form class="mt-6 space-y-4" @submit.prevent="submit" novalidate>
              <!-- Name -->
              <div>
                <label for="name" class="sr-only">Name</label>
                <input
                  id="name"
                  v-model="name"
                  type="text"
                  placeholder="Name"
                  class="w-full rounded-xl border border-gray-200 focus:border-[#1D50A2]
                         bg-white/90 dark:bg-gray-950 dark:border-white/10
                         px-4 py-3 text-sm text-gray-900 dark:text-gray-100
                         placeholder:text-gray-400 outline-none
                         focus:ring-2 focus:ring-[#1D50A2] transition"
                  autocomplete="name"
                />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="sr-only">Email</label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  class="w-full rounded-xl border border-gray-200 focus:border-[#1D50A2]
                         bg-white/90 dark:bg-gray-950 dark:border-white/10
                         px-4 py-3 text-sm text-gray-900 dark:text-gray-100
                         placeholder:text-gray-400 outline-none
                         focus:ring-2 focus:ring-[#1D50A2] transition"
                  autocomplete="email"
                />
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="sr-only">Message</label>
                <textarea
                  id="message"
                  v-model="message"
                  rows="5"
                  placeholder="Message"
                  class="w-full resize-y rounded-xl border border-gray-200 focus:border-[#1D50A2]
                         bg-white/90 dark:bg-gray-950 dark:border-white/10
                         px-4 py-3 text-sm text-gray-900 dark:text-gray-100
                         placeholder:text-gray-400 outline-none
                         focus:ring-2 focus:ring-[#1D50A2] transition"
                />
              </div>

              <!-- Alerts -->
              <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>
              <p v-if="sent" class="text-sm text-emerald-600">Thanks! Your message has been sent.</p>

              <!-- Submit -->
              <button
                type="submit"
                :disabled="sending"
                class="w-full cursor-pointer inline-flex items-center justify-center
                       h-[50px] px-8 gap-4 rounded-[130px]
                       text-[15px] font-semibold leading-none
                       text-white bg-[#1D50A2] hover:bg-[#17408B]
                       disabled:opacity-60 disabled:cursor-not-allowed
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D50A2]
                       focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3F7FF]
                       dark:focus-visible:ring-offset-gray-900
                       transition"
                aria-label="Send message"
              >
                <span>{{ sending ? 'Sending…' : 'Send' }}</span>
              </button>
            </form>
          </div>

          <!-- Right: map -->
          <div class="lg:col-span-7">
            <div class="relative h-80 sm:h-[380px] lg:h-full">
              <iframe
                :src="mapEmbedUrl"
                class="absolute inset-0 size-full"
                style="border:0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                aria-label="Map of our location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom info bar -->
      <div
        class="mt-6 sm:mt-8 rounded-xl bg-[#0F2350] text-white
               ring-1 ring-black/5 dark:ring-white/10
               shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
      >
        <dl class="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <!-- Address -->
          <div class="p-6 sm:p-8">
            <dt class="text-lg font-semibold">{{ addressTitle }}</dt>
            <dd class="mt-2 whitespace-pre-line text-white/80 text-sm leading-6">
              {{ address }}
            </dd>
          </div>

          <!-- Phone -->
          <div class="p-6 sm:p-8">
            <dt class="text-lg font-semibold">{{ phoneTitle }}</dt>
            <dd class="mt-2 text-white/80 text-sm leading-6">
              <a
                class="hover:underline focus:outline-none focus:ring-2 ring-white/50 rounded px-1"
                :href="`tel:${(phone || '').replace(/[^+\d]/g,'')}`"
              >
                {{ phone }}
              </a>
            </dd>
          </div>

          <!-- Email -->
          <div class="p-6 sm:p-8">
            <dt class="text-lg font-semibold">{{ emailTitle }}</dt>
            <dd class="mt-2 text-white/80 text-sm leading-6">
              <a
                class="hover:underline focus:outline-none focus:ring-2 ring-white/50 rounded px-1"
                :href="`mailto:${emailinf}`"
              >
                {{ emailinf }}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
