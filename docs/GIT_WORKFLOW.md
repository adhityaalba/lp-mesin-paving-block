# Workflow Git dengan izin pengguna

## Aturan wajib

**Jangan menjalankan `git commit`, `git pull`, atau `git push` tanpa izin eksplisit pengguna untuk tindakan dan lingkup terkait.** Larangan ini juga mencakup GUI, API, alias, script, atau tool lain yang melakukan tindakan setara.

Izin edit kode bukan izin commit. Izin commit bukan izin push. Izin push bukan izin merge PR atau deploy terpisah. Jangan mengganti pull dengan fetch lalu merge/rebase untuk menghindari persetujuan.

Izin berlaku untuk tindakan yang disepakati, bukan seluruh sesi tanpa batas. Instruksi langsung seperti “commit perubahan SEO ini saja” sudah merupakan izin dan tidak perlu ditanyakan ulang. Jika lingkup berubah, minta izin baru.

## Tindakan dan batasannya

| Tindakan | Kebijakan |
|---|---|
| `status`, `diff`, `log`, pemeriksaan branch/remote lokal | Boleh untuk inspeksi tugas |
| Edit lokal dan pemeriksaan | Boleh dalam lingkup permintaan |
| Membuat branch kerja lokal | Boleh bila diperlukan; gunakan `codex/<topik>` kecuali pengguna menentukan lain |
| Staging | Hanya file/hunk dalam lingkup; jangan mengubah staging pengguna; siapkan menjelang commit yang diizinkan |
| `fetch` | Minta izin bila belum termasuk instruksi sinkronisasi eksplisit; tidak mengintegrasikan perubahan |
| `pull`, `commit`, `push` | Izin eksplisit untuk masing-masing tindakan |
| Merge/rebase, stash, amend, reset, clean, force push, hapus branch | Persetujuan spesifik; jelaskan dampak dan potensi kehilangan pekerjaan |
| Publish/deploy/perubahan domain | Persetujuan sesuai target dan dampaknya |

“Oke” atau “lanjut” hanya menjadi izin jika jelas menjawab proposal Git spesifik tepat sebelumnya. Diam atau waktu tunggu bukan persetujuan. Persetujuan tooling/sandbox tidak memperluas lingkup pekerjaan yang diminta pengguna.

## Sebelum commit

1. Periksa `git status`, diff unstaged, dan diff staged. Identifikasi perubahan milik pengguna.
2. Selesaikan perubahan dan pemeriksaan yang relevan terlebih dahulu.
3. Tunjukkan daftar file, ringkasan perubahan, hasil pemeriksaan, dan usulan pesan commit.
4. Minta izin jika belum diberikan, misalnya: “Boleh commit lima file panduan ini dengan pesan `docs: add project and SEO workflow rules`? Belum termasuk push.”
5. Setelah diizinkan, stage path/hunk yang disetujui secara spesifik; hindari `git add .` atau `git add -A` tanpa memeriksa seluruh isinya.
6. Periksa staged diff terakhir. Jika ada staging pengguna yang tidak termasuk izin, jangan mengikutkannya atau membatalkannya diam-diam; klarifikasi lingkup.
7. Commit lalu laporkan hash, pesan, dan sisa perubahan lokal.

Format pesan: `<type>: <tujuan perubahan>`. Gunakan `feat`, `fix`, `refactor`, `docs`, `test`, atau `chore` sesuai isi. Satu commit memiliki satu tujuan yang jelas; hindari pesan seperti “update” tanpa keterangan.

## Sebelum pull

1. Identifikasi branch aktif, remote/upstream, dan perubahan lokal/staging.
2. Jelaskan target serta strategi. Default yang diusulkan: `git pull --ff-only <remote> <branch>` setelah target dikonfirmasi; jangan mengasumsikan nama remote atau branch.
3. Jika perubahan lokal berisiko terpengaruh, siapkan opsi penanganan dan minta keputusan. Jangan otomatis stash atau commit.
4. Setelah izin, jalankan pada target yang disepakati. Jika divergen atau konflik, hentikan integrasi otomatis; jelaskan opsi merge/rebase dan minta izin tambahan.

## Sebelum push

1. Periksa branch lokal, remote tujuan, branch tujuan, dan commit yang akan dikirim. Jika informasi remote belum diperbarui, nyatakan keterbatasannya atau minta izin fetch.
2. Periksa dampak pipeline yang diketahui. Jika push memicu deploy otomatis, sebutkan lingkungan tujuan agar persetujuan mencakup dampak tersebut. Jangan mengklaim tidak ada deploy tanpa bukti.
3. Tunjukkan commit/ringkasan dan minta izin push jika belum diberikan.
4. Push hanya branch yang disetujui; jangan gunakan `--all`, `--mirror`, atau force tanpa izin spesifik.
5. Jika ditolak remote karena tidak fast-forward, jangan otomatis pull/rebase/force push. Laporkan dan minta keputusan.
6. Verifikasi hasil dan laporkan tujuan push. Jangan menyebut deploy berhasil hanya karena push berhasil.

## Contoh cakupan izin

- “Buat konteksnya” → edit dokumentasi lokal; tanpa commit/pull/push.
- “Commit aturan yang baru dibuat, jangan push” → commit file aturan yang ditinjau saja.
- “Push commit tersebut ke branch X pada remote Y” → push commit dan target tersebut.
- “Pull branch X dari remote Y dengan fast-forward only” → pull sesuai target; kegagalan tidak memberi izin rebase.

Ini adalah aturan perilaku agen, bukan penguncian Git secara teknis. Jangan memasang hook, mengubah konfigurasi Git, atau branch protection tanpa permintaan pengguna.
