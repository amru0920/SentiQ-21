/* Translations for Bahasa Melayu, English, Tamil and Mandarin.
 *
 * English is the fallback: any key missing from another language falls back
 * to the English string rather than rendering blank. test/i18n.test.js keeps
 * the four tables in step with each other.
 *
 * Note on the DASS-21 statements: these are careful translations of the
 * wording the app already used, not the officially validated instruments.
 * Clinical or research use should adopt the published validated versions. */
(function (global) {
  'use strict';

  var LANGS = [
    { code: 'ms', label: 'BM', name: 'Bahasa Melayu', html: 'ms' },
    { code: 'en', label: 'EN', name: 'English', html: 'en' },
    { code: 'ta', label: 'தமிழ்', name: 'தமிழ்', html: 'ta' },
    { code: 'zh', label: '中文', name: '中文', html: 'zh-Hans' },
  ];

  /* Install steps are arrays of alternating plain and highlighted fragments.
   * The highlighted pieces stay in English on purpose: they are the labels
   * the person has to find in Chrome's or Safari's own menus, which on most
   * phones in Malaysia are set to English. */
  var DICT = {
    en: {
      'lang.label': 'Language',

      'home.welcome': 'Welcome to',
      'home.instructions': 'Instructions',
      'home.p1': 'Please read each statement and select a number (0 to 3) ' +
        'indicating how much the statement applied to you over the past week.',
      'home.p2': 'There are no right or wrong answers. Do not spend too much ' +
        'time on any statement.',
      'home.ratingTitle': 'Rating Scale:',
      'home.start': 'Start DASS-21',
      'home.history': 'View past results',
      'home.install': 'Install on your phone',

      'scale.0': '0 - Did not apply to me at all',
      'scale.1': '1 - Applied to me to some degree, or some of the time',
      'scale.2': '2 - Applied to me to a considerable degree or a good part of time',
      'scale.3': '3 - Applied to me very much or most of the time',

      'quiz.title': 'DASS-21',
      'quiz.progress': '{done} of {total} answered',
      'quiz.submit': 'Submit',
      'quiz.missing': 'Please answer question {n} to continue.',
      'quiz.back': 'Back',

      'result.title': 'Result',
      'result.heading': 'Your DASS-21 Scores',
      'result.print': 'Print PDF',
      'result.back': 'Back',
      'result.disclaimer': 'The DASS-21 should not be used to replace a ' +
        'face-to-face clinical interview. If you are experiencing significant ' +
        'emotional difficulties, please consult your doctor or a qualified ' +
        'mental health professional.',
      'result.saving': 'Saving to your account...',
      'result.saved': 'Saved to your account.',
      'result.savedLocal': 'Saved on this device. It will sync when you are ' +
        'back online.',

      'history.title': 'History',
      'history.clear': 'Clear history on this device',
      'history.empty': 'No results saved yet. Finish a DASS-21 screening and ' +
        'it will appear here.',
      'history.confirm': 'Delete every result saved on this device?',
      'history.cleared': 'History cleared.',

      'subscale.depression': 'Depression',
      'subscale.anxiety': 'Anxiety',
      'subscale.stress': 'Stress',

      'severity.normal': 'Normal',
      'severity.mild': 'Mild',
      'severity.moderate': 'Moderate',
      'severity.severe': 'Severe',
      'severity.extreme': 'Extremely Severe',

      'print.title': 'DASS-21 Results',
      'print.about': 'About DASS-21',
      'print.p2': 'The DASS-21 is a set of three self-report scales designed ' +
        'to measure the emotional states of depression, anxiety and stress. ' +
        'It does not diagnose disorders but measures their severity based on ' +
        'symptoms.',

      'install.title': 'Install SentiQ 21',
      'install.sub': 'Add it to your home screen and open it like any other ' +
        'app — it works without internet too.',
      'install.now': 'Install now',
      'install.android': 'Android',
      'install.ios': 'iPhone / iPad',
      'install.close': 'Close',
      'install.warnInApp': 'You opened this from inside another app, which ' +
        'cannot install anything. Tap the menu and choose "Open in browser" ' +
        'first.',
      'install.warnIos': 'On iPhone and iPad only Safari can add an app to ' +
        'the home screen.',

      'advice.title': 'What you can do',
      'advice.steps': 'Practical steps',
      'advice.retest': 'Scores move. Take the test again in two weeks and compare.',
      'advice.action.normal': 'Nothing here needs action right now. Take the test again in a few weeks, or whenever things change.',
      'advice.action.mild': 'Try the steps below for two weeks, then take the test again and compare.',
      'advice.action.moderate': 'Work through the steps below, and consider booking a session with a counsellor at your institution or clinic.',
      'advice.action.severe': 'Please make an appointment with a doctor, counsellor or mental health professional this week.',
      'advice.action.extreme': 'Please speak to a mental health professional as soon as you can. If you need someone to talk to right now, the numbers below are free and confidential.',

      'advice.depression.normal': 'Your depression score is in the normal range. Low days are still part of life, and the habits below help keep them from settling in.',
      'advice.depression.mild': 'You are showing some signs of low mood. This is common, and it often lifts with small, steady changes.',
      'advice.depression.moderate': 'Low mood is affecting you noticeably. The steps below still help, but it is worth talking to a counsellor as well.',
      'advice.depression.severe': 'Your depression score is high. Please talk to a doctor, counsellor or mental health professional - this is more than self-help is meant to carry alone.',
      'advice.depression.extreme': 'Your depression score is very high. Please reach out to a professional, or one of the helplines below, soon. You do not have to sort this out on your own.',
      'advice.depression.s1': 'Do one small thing you used to enjoy, even for ten minutes. With low mood, action usually comes before motivation, not after it.',
      'advice.depression.s2': 'Keep the same sleep and wake time every day, including on the days that feel empty.',
      'advice.depression.s3': 'Get outside and move a little each day. A short walk counts.',
      'advice.depression.s4': 'Tell one person you trust how you have actually been feeling this week.',
      'advice.depression.s5': 'Break tasks into the smallest possible step, and count finishing that step as done.',

      'advice.anxiety.normal': 'Your anxiety score is in the normal range. Feeling nervous before something that matters is normal, and useful.',
      'advice.anxiety.mild': 'You are carrying some anxiety. The steps below work best practised daily, not only once you already feel anxious.',
      'advice.anxiety.moderate': 'Anxiety is affecting you noticeably. Try the steps below, and consider speaking to a counsellor about it.',
      'advice.anxiety.severe': 'Your anxiety score is high. Please speak to a doctor or mental health professional - anxiety at this level responds well to treatment.',
      'advice.anxiety.extreme': 'Your anxiety score is very high. Please reach out to a professional, or one of the helplines below, soon.',
      'advice.anxiety.s1': 'Slow your breathing: in for four counts, out for six, for two minutes. The longer out-breath is what settles the body.',
      'advice.anxiety.s2': 'Write down what you are afraid will happen, then write what is most likely to happen instead.',
      'advice.anxiety.s3': 'Cut down caffeine and energy drinks, especially after midday.',
      'advice.anxiety.s4': 'Do not avoid what you fear completely. Approach it in small steps, so the avoidance does not grow.',
      'advice.anxiety.s5': 'Set aside ten minutes a day to worry on purpose, and park worries outside that window until then.',

      'advice.stress.normal': 'Your stress score is in the normal range. Keep the routines that are already working for you.',
      'advice.stress.mild': 'You are under some pressure. Small adjustments now usually stop it building further.',
      'advice.stress.moderate': 'You are under considerable pressure. Protect your rest and your workload on purpose, and consider talking it through with someone.',
      'advice.stress.severe': 'Your stress score is high. Something in your load needs to change, and it is worth getting help to work out what.',
      'advice.stress.extreme': 'Your stress score is very high. Please talk to someone who can help you change the situation, not only cope with it.',
      'advice.stress.s1': 'Write down everything on your plate, then mark only what is genuinely urgent today.',
      'advice.stress.s2': 'Say no to, or postpone, one commitment this week.',
      'advice.stress.s3': 'Take a real break away from screens: fifteen minutes, phone out of reach.',
      'advice.stress.s4': 'Move your body for twenty to thirty minutes - walking, cycling, swimming, anything.',
      'advice.stress.s5': 'Protect the hour before bed. No work, no study, no scrolling.',

      'help.title': 'Talk to someone',
      'help.body': 'These services are free and confidential, and you do not need a referral.',
      'help.emergency': 'If you or someone else is in immediate danger, call 999.',
      'help.hours24': '24 hours',

      'details.title': 'Before you start',
      'details.intro': 'If you give your name and number, the counselling unit can contact you when your result shows you may need support. You can also take the test without them.',
      'details.name': 'Full name',
      'details.namePlaceholder': 'Your name as your institution knows it',
      'details.phone': 'Phone number (WhatsApp)',
      'details.phonePlaceholder': 'e.g. 012-345 6789',
      'details.consent': 'I agree that my name, number and result may be shared with my institution\u2019s counselling unit if my score is high.',
      'details.privacy': 'Your name and number are used only so a counsellor can reach you. They are never shown to other users of this app, and the app never posts anything on your behalf.',
      'details.continue': 'Continue',
      'details.skip': 'Continue without my details',
      'details.errName': 'Please enter your name, or choose to continue without your details.',
      'details.errPhone': 'Please enter a phone number a counsellor can reach you on.',
      'details.errConsent': 'Please tick the box, or choose to continue without your details.',

      'followup.title': 'Would you like to talk to a counsellor?',
      'followup.body': 'Your score is high enough that talking to someone would help. The button below opens WhatsApp with your result already written out - you only need to press send.',
      'followup.chat': 'Chat with a counsellor on WhatsApp',
      'followup.later': 'Not now',
      'followup.noNumber': 'No counsellor number has been set up in this app yet. The 24-hour helplines above are open to anyone.',

      'wa.heading': 'SentiQ 21 - request for counselling support',
      'wa.name': 'Name',
      'wa.phone': 'Phone',
      'wa.date': 'Test taken',
      'wa.results': 'DASS-21 result',
      'wa.closing': 'I would like to get counselling support.',
      'wa.notGiven': 'not given',

      'q1': 'I found it hard to wind down',
      'q2': 'I was aware of dryness of my mouth',
      'q3': "I couldn't seem to experience any positive feeling at all",
      'q4': 'I experienced breathing difficulty',
      'q5': 'I found it difficult to work up the initiative to do things',
      'q6': 'I tended to over-react to situations',
      'q7': 'I experienced trembling',
      'q8': 'I felt that I was using a lot of nervous energy',
      'q9': 'I was worried about situations in which I might panic',
      'q10': 'I felt that I had nothing to look forward to',
      'q11': 'I found myself getting agitated',
      'q12': 'I found it difficult to relax',
      'q13': 'I felt down-hearted and blue',
      'q14': 'I was intolerant of anything that kept me from getting on',
      'q15': 'I felt I was close to panic',
      'q16': 'I was unable to become enthusiastic about anything',
      'q17': "I felt I wasn't worth much as a person",
      'q18': 'I felt that I was rather touchy',
      'q19': 'I was aware of the action of my heart',
      'q20': 'I felt scared without any good reason',
      'q21': 'I felt that life was meaningless',
    },

    ms: {
      'lang.label': 'Bahasa',

      'home.welcome': 'Selamat datang ke',
      'home.instructions': 'Arahan',
      'home.p1': 'Sila baca setiap penyataan dan pilih satu nombor (0 hingga ' +
        '3) yang menunjukkan sejauh mana penyataan itu berkaitan dengan anda ' +
        'sepanjang minggu lepas.',
      'home.p2': 'Tiada jawapan betul atau salah. Jangan ambil masa terlalu ' +
        'lama untuk mana-mana penyataan.',
      'home.ratingTitle': 'Skala Penilaian:',
      'home.start': 'Mula DASS-21',
      'home.history': 'Lihat keputusan lepas',
      'home.install': 'Pasang di telefon anda',

      'scale.0': '0 - Tidak berkaitan dengan saya sama sekali',
      'scale.1': '1 - Berkaitan dengan saya sedikit, atau kadang-kadang',
      'scale.2': '2 - Berkaitan dengan saya pada tahap yang ketara, atau kerap kali',
      'scale.3': '3 - Sangat berkaitan dengan saya, atau kebanyakan masa',

      'quiz.title': 'DASS-21',
      'quiz.progress': '{done} daripada {total} dijawab',
      'quiz.submit': 'Hantar',
      'quiz.missing': 'Sila jawab soalan {n} untuk teruskan.',
      'quiz.back': 'Kembali',

      'result.title': 'Keputusan',
      'result.heading': 'Skor DASS-21 Anda',
      'result.print': 'Cetak PDF',
      'result.back': 'Kembali',
      'result.disclaimer': 'DASS-21 tidak boleh digunakan untuk menggantikan ' +
        'temu bual klinikal bersemuka. Jika anda mengalami kesukaran emosi ' +
        'yang ketara, sila berjumpa doktor atau profesional kesihatan mental ' +
        'yang bertauliah.',
      'result.saving': 'Menyimpan ke akaun anda...',
      'result.saved': 'Disimpan ke akaun anda.',
      'result.savedLocal': 'Disimpan dalam peranti ini. Ia akan disegerakkan ' +
        'apabila anda kembali dalam talian.',

      'history.title': 'Sejarah',
      'history.clear': 'Padam sejarah dalam peranti ini',
      'history.empty': 'Tiada keputusan disimpan lagi. Selesaikan saringan ' +
        'DASS-21 dan ia akan muncul di sini.',
      'history.confirm': 'Padam semua keputusan yang disimpan dalam peranti ini?',
      'history.cleared': 'Sejarah dipadam.',

      'subscale.depression': 'Kemurungan',
      'subscale.anxiety': 'Kebimbangan',
      'subscale.stress': 'Tekanan',

      'severity.normal': 'Normal',
      'severity.mild': 'Ringan',
      'severity.moderate': 'Sederhana',
      'severity.severe': 'Teruk',
      'severity.extreme': 'Sangat Teruk',

      'print.title': 'Keputusan DASS-21',
      'print.about': 'Mengenai DASS-21',
      'print.p2': 'DASS-21 ialah set tiga skala laporan kendiri yang direka ' +
        'untuk mengukur keadaan emosi kemurungan, kebimbangan dan tekanan. Ia ' +
        'tidak mendiagnosis gangguan, tetapi mengukur tahap keparahannya ' +
        'berdasarkan simptom.',

      'install.title': 'Pasang SentiQ 21',
      'install.sub': 'Tambah ke skrin utama dan buka seperti aplikasi biasa — ' +
        'ia berfungsi tanpa internet juga.',
      'install.now': 'Pasang sekarang',
      'install.android': 'Android',
      'install.ios': 'iPhone / iPad',
      'install.close': 'Tutup',
      'install.warnInApp': 'Anda membuka pautan ini dari dalam aplikasi lain, ' +
        'yang tidak boleh memasang apa-apa. Tekan menu dan pilih "Open in ' +
        'browser" dahulu.',
      'install.warnIos': 'Pada iPhone dan iPad, hanya Safari boleh menambah ' +
        'aplikasi ke skrin utama.',

      'advice.title': 'Apa yang anda boleh buat',
      'advice.steps': 'Langkah praktikal',
      'advice.retest': 'Skor boleh berubah. Ambil ujian ini semula dalam dua minggu dan bandingkan.',
      'advice.action.normal': 'Tiada apa yang perlu tindakan segera. Ambil ujian ini semula dalam beberapa minggu, atau bila keadaan berubah.',
      'advice.action.mild': 'Cuba langkah di bawah selama dua minggu, kemudian ambil ujian ini semula dan bandingkan.',
      'advice.action.moderate': 'Amalkan langkah di bawah, dan pertimbangkan untuk berjumpa kaunselor di institusi atau klinik anda.',
      'advice.action.severe': 'Sila buat temu janji dengan doktor, kaunselor atau profesional kesihatan mental minggu ini.',
      'advice.action.extreme': 'Sila berjumpa profesional kesihatan mental secepat mungkin. Kalau anda perlu bercakap dengan seseorang sekarang, nombor di bawah adalah percuma dan sulit.',

      'advice.depression.normal': 'Skor kemurungan anda berada dalam julat normal. Hari yang murung tetap sebahagian daripada hidup, dan tabiat di bawah membantu supaya ia tidak berpanjangan.',
      'advice.depression.mild': 'Anda menunjukkan sedikit tanda perasaan murung. Ini perkara biasa, dan selalunya pulih dengan perubahan kecil yang konsisten.',
      'advice.depression.moderate': 'Perasaan murung memberi kesan yang ketara kepada anda. Langkah di bawah tetap membantu, tetapi eloklah berbincang dengan kaunselor juga.',
      'advice.depression.severe': 'Skor kemurungan anda tinggi. Sila berjumpa doktor, kaunselor atau profesional kesihatan mental - keadaan ini bukan untuk ditanggung dengan bantuan kendiri sahaja.',
      'advice.depression.extreme': 'Skor kemurungan anda sangat tinggi. Sila hubungi profesional, atau salah satu talian di bawah, secepat mungkin. Anda tidak perlu hadapi ini seorang diri.',
      'advice.depression.s1': 'Buat satu perkara kecil yang dahulu anda gemari, walaupun sepuluh minit. Bila murung, tindakan biasanya datang dahulu, baru semangat menyusul.',
      'advice.depression.s2': 'Kekalkan waktu tidur dan bangun yang sama setiap hari, termasuk pada hari yang terasa kosong.',
      'advice.depression.s3': 'Keluar dan bergerak sedikit setiap hari. Berjalan kaki sekejap pun dikira.',
      'advice.depression.s4': 'Beritahu seorang yang anda percaya tentang perasaan sebenar anda minggu ini.',
      'advice.depression.s5': 'Pecahkan tugas kepada langkah sekecil mungkin, dan kira langkah itu sebagai selesai bila ia siap.',

      'advice.anxiety.normal': 'Skor kebimbangan anda berada dalam julat normal. Rasa gementar sebelum sesuatu yang penting adalah normal, malah berguna.',
      'advice.anxiety.mild': 'Anda membawa sedikit kebimbangan. Langkah di bawah paling berkesan bila diamalkan setiap hari, bukan hanya ketika sudah rasa cemas.',
      'advice.anxiety.moderate': 'Kebimbangan memberi kesan yang ketara kepada anda. Cuba langkah di bawah, dan pertimbangkan untuk berbincang dengan kaunselor.',
      'advice.anxiety.severe': 'Skor kebimbangan anda tinggi. Sila berjumpa doktor atau profesional kesihatan mental - kebimbangan pada tahap ini memberi tindak balas yang baik kepada rawatan.',
      'advice.anxiety.extreme': 'Skor kebimbangan anda sangat tinggi. Sila hubungi profesional, atau salah satu talian di bawah, secepat mungkin.',
      'advice.anxiety.s1': 'Perlahankan pernafasan: tarik nafas kira empat, hembus kira enam, selama dua minit. Hembusan yang lebih panjang itulah yang menenangkan badan.',
      'advice.anxiety.s2': 'Tulis apa yang anda takut akan berlaku, kemudian tulis apa yang paling mungkin berlaku sebenarnya.',
      'advice.anxiety.s3': 'Kurangkan kafein dan minuman tenaga, terutamanya selepas tengah hari.',
      'advice.anxiety.s4': 'Jangan elak sepenuhnya perkara yang anda takuti. Dekati sedikit demi sedikit, supaya sikap mengelak itu tidak membesar.',
      'advice.anxiety.s5': 'Peruntukkan sepuluh minit sehari khas untuk risau, dan tangguhkan risau di luar tempoh itu.',

      'advice.stress.normal': 'Skor tekanan anda berada dalam julat normal. Kekalkan rutin yang sedang berkesan untuk anda.',
      'advice.stress.mild': 'Anda sedang menanggung sedikit tekanan. Penyesuaian kecil sekarang biasanya menghalang ia daripada bertimbun.',
      'advice.stress.moderate': 'Anda menanggung tekanan yang agak berat. Jaga waktu rehat dan beban kerja anda secara sedar, dan pertimbangkan untuk berbincang dengan seseorang.',
      'advice.stress.severe': 'Skor tekanan anda tinggi. Ada sesuatu dalam beban anda yang perlu diubah, dan eloklah dapatkan bantuan untuk kenal pasti apa.',
      'advice.stress.extreme': 'Skor tekanan anda sangat tinggi. Sila berbincang dengan seseorang yang boleh membantu anda mengubah keadaan, bukan sekadar bertahan dengannya.',
      'advice.stress.s1': 'Tulis semua perkara yang perlu anda uruskan, kemudian tandakan yang benar-benar mendesak hari ini sahaja.',
      'advice.stress.s2': 'Tolak atau tangguhkan satu komitmen minggu ini.',
      'advice.stress.s3': 'Ambil rehat sebenar jauh daripada skrin: lima belas minit, telefon diletakkan jauh.',
      'advice.stress.s4': 'Gerakkan badan dua puluh hingga tiga puluh minit - berjalan, berbasikal, berenang, apa sahaja.',
      'advice.stress.s5': 'Jaga satu jam sebelum tidur. Tiada kerja, tiada ulang kaji, tiada skrol telefon.',

      'help.title': 'Bercakap dengan seseorang',
      'help.body': 'Perkhidmatan ini percuma dan sulit, dan anda tidak perlukan surat rujukan.',
      'help.emergency': 'Jika anda atau orang lain dalam bahaya serta-merta, hubungi 999.',
      'help.hours24': '24 jam',

      'details.title': 'Sebelum anda mula',
      'details.intro': 'Kalau anda beri nama dan nombor, unit kaunseling boleh menghubungi anda apabila keputusan menunjukkan anda mungkin perlukan sokongan. Anda juga boleh ambil ujian ini tanpa memberinya.',
      'details.name': 'Nama penuh',
      'details.namePlaceholder': 'Nama seperti dalam rekod institusi anda',
      'details.phone': 'Nombor telefon (WhatsApp)',
      'details.phonePlaceholder': 'contoh 012-345 6789',
      'details.consent': 'Saya bersetuju nama, nombor dan keputusan saya boleh dikongsi dengan unit kaunseling institusi saya jika skor saya tinggi.',
      'details.privacy': 'Nama dan nombor anda digunakan semata-mata supaya kaunselor boleh menghubungi anda. Ia tidak pernah dipaparkan kepada pengguna lain, dan app ini tidak pernah menghantar apa-apa bagi pihak anda.',
      'details.continue': 'Teruskan',
      'details.skip': 'Teruskan tanpa butiran saya',
      'details.errName': 'Sila masukkan nama anda, atau pilih teruskan tanpa butiran.',
      'details.errPhone': 'Sila masukkan nombor telefon yang boleh dihubungi kaunselor.',
      'details.errConsent': 'Sila tandakan kotak itu, atau pilih teruskan tanpa butiran.',

      'followup.title': 'Nak berbual dengan kaunselor?',
      'followup.body': 'Skor anda cukup tinggi sehingga berbual dengan seseorang akan membantu. Butang di bawah membuka WhatsApp dengan keputusan anda sudah tertulis - anda cuma perlu tekan hantar.',
      'followup.chat': 'Chat dengan kaunselor di WhatsApp',
      'followup.later': 'Tidak sekarang',
      'followup.noNumber': 'Nombor kaunselor belum ditetapkan dalam app ini. Talian bantuan 24 jam di atas terbuka kepada sesiapa sahaja.',

      'wa.heading': 'SentiQ 21 - permohonan sokongan kaunseling',
      'wa.name': 'Nama',
      'wa.phone': 'No. telefon',
      'wa.date': 'Tarikh ujian',
      'wa.results': 'Keputusan DASS-21',
      'wa.closing': 'Saya ingin mendapatkan sokongan kaunseling.',
      'wa.notGiven': 'tidak diberi',

      'q1': 'Saya dapati diri saya susah untuk bertenang',
      'q2': 'Saya sedar mulut saya terasa kering',
      'q3': 'Saya langsung tidak dapat merasai sebarang perasaan positif',
      'q4': 'Saya mengalami kesukaran bernafas',
      'q5': 'Saya sukar mendapatkan semangat untuk melakukan sesuatu',
      'q6': 'Saya cenderung bertindak berlebihan terhadap sesuatu keadaan',
      'q7': 'Saya mengalami keadaan menggeletar',
      'q8': 'Saya rasa saya menggunakan banyak tenaga untuk berasa cemas',
      'q9': 'Saya risau tentang keadaan di mana saya mungkin panik',
      'q10': 'Saya rasa tiada perkara yang boleh saya harapkan',
      'q11': 'Saya dapati diri saya mudah resah',
      'q12': 'Saya rasa sukar untuk bertenang',
      'q13': 'Saya berasa sedih dan murung',
      'q14': 'Saya tidak sabar dengan apa-apa yang menghalang saya meneruskan kerja',
      'q15': 'Saya rasa saya hampir panik',
      'q16': 'Saya langsung tidak bersemangat tentang apa-apa',
      'q17': 'Saya rasa diri saya tidak berharga sebagai seorang insan',
      'q18': 'Saya rasa saya mudah tersinggung',
      'q19': 'Saya sedar akan degupan jantung saya',
      'q20': 'Saya berasa takut tanpa sebab yang munasabah',
      'q21': 'Saya rasa hidup ini tidak bermakna',
    },

    ta: {
      'lang.label': 'மொழி',

      'home.welcome': 'வரவேற்கிறோம்',
      'home.instructions': 'அறிவுரைகள்',
      'home.p1': 'ஒவ்வொரு கூற்றையும் படித்து, கடந்த வாரத்தில் அது உங்களுக்கு ' +
        'எந்த அளவுக்குப் பொருந்தியது என்பதைக் குறிக்கும் எண்ணை (0 முதல் 3 வரை) ' +
        'தேர்ந்தெடுக்கவும்.',
      'home.p2': 'சரியான அல்லது தவறான பதில்கள் இல்லை. எந்தவொரு கூற்றிலும் அதிக ' +
        'நேரம் செலவிட வேண்டாம்.',
      'home.ratingTitle': 'மதிப்பீட்டு அளவுகோல்:',
      'home.start': 'DASS-21 தொடங்கு',
      'home.history': 'முந்தைய முடிவுகளைப் பார்க்க',
      'home.install': 'உங்கள் தொலைபேசியில் நிறுவவும்',

      'scale.0': '0 - எனக்கு இது முற்றிலும் பொருந்தவில்லை',
      'scale.1': '1 - எனக்கு ஓரளவு, அல்லது சில சமயங்களில் பொருந்தியது',
      'scale.2': '2 - எனக்கு கணிசமான அளவு, அல்லது அடிக்கடி பொருந்தியது',
      'scale.3': '3 - எனக்கு மிக அதிகமாக, அல்லது பெரும்பாலான நேரங்களில் பொருந்தியது',

      'quiz.title': 'DASS-21',
      'quiz.progress': '{total} இல் {done} பதிலளிக்கப்பட்டது',
      'quiz.submit': 'சமர்ப்பி',
      'quiz.missing': 'தொடர {n}-ஆம் கேள்விக்குப் பதிலளிக்கவும்.',
      'quiz.back': 'பின்செல்',

      'result.title': 'முடிவு',
      'result.heading': 'உங்கள் DASS-21 மதிப்பெண்கள்',
      'result.print': 'PDF அச்சிடு',
      'result.back': 'பின்செல்',
      'result.disclaimer': 'DASS-21 ஐ நேரடி மருத்துவ ஆலோசனைக்கு மாற்றாகப் ' +
        'பயன்படுத்தக் கூடாது. நீங்கள் கடுமையான உணர்ச்சிச் சிக்கல்களை ' +
        'எதிர்கொண்டால், மருத்துவரையோ தகுதியான மனநல நிபுணரையோ அணுகவும்.',
      'result.saving': 'உங்கள் கணக்கில் சேமிக்கப்படுகிறது...',
      'result.saved': 'உங்கள் கணக்கில் சேமிக்கப்பட்டது.',
      'result.savedLocal': 'இந்தச் சாதனத்தில் சேமிக்கப்பட்டது. மீண்டும் ' +
        'இணையத்துடன் இணைந்ததும் ஒத்திசைக்கப்படும்.',

      'history.title': 'வரலாறு',
      'history.clear': 'இந்தச் சாதனத்தில் உள்ள வரலாற்றை அழிக்கவும்',
      'history.empty': 'இதுவரை முடிவுகள் எதுவும் சேமிக்கப்படவில்லை. DASS-21 ' +
        'பரிசோதனையை முடித்ததும் அது இங்கே தோன்றும்.',
      'history.confirm': 'இந்தச் சாதனத்தில் சேமிக்கப்பட்ட அனைத்து முடிவுகளையும் நீக்கவா?',
      'history.cleared': 'வரலாறு அழிக்கப்பட்டது.',

      'subscale.depression': 'மனச்சோர்வு',
      'subscale.anxiety': 'பதட்டம்',
      'subscale.stress': 'மன அழுத்தம்',

      'severity.normal': 'இயல்பானது',
      'severity.mild': 'லேசானது',
      'severity.moderate': 'மிதமானது',
      'severity.severe': 'கடுமையானது',
      'severity.extreme': 'மிகக் கடுமையானது',

      'print.title': 'DASS-21 முடிவுகள்',
      'print.about': 'DASS-21 பற்றி',
      'print.p2': 'DASS-21 என்பது மனச்சோர்வு, பதட்டம் மற்றும் மன அழுத்தம் ஆகிய ' +
        'உணர்வு நிலைகளை அளவிட வடிவமைக்கப்பட்ட மூன்று சுய-அறிக்கை ' +
        'அளவுகோல்களின் தொகுப்பு. இது நோயைக் கண்டறியாது; அறிகுறிகளின் ' +
        'அடிப்படையில் அவற்றின் தீவிரத்தை மட்டுமே அளவிடுகிறது.',

      'install.title': 'SentiQ 21 ஐ நிறுவவும்',
      'install.sub': 'இதை உங்கள் முகப்புத் திரையில் சேர்த்து, வழக்கமான ' +
        'செயலியைப் போலவே திறக்கலாம் — இணையம் இல்லாமலும் இது இயங்கும்.',
      'install.now': 'இப்போது நிறுவு',
      'install.android': 'Android',
      'install.ios': 'iPhone / iPad',
      'install.close': 'மூடு',
      'install.warnInApp': 'நீங்கள் இதை வேறொரு செயலிக்குள் இருந்து ' +
        'திறந்துள்ளீர்கள்; அங்கு எதையும் நிறுவ முடியாது. மெனுவைத் தட்டி ' +
        '"Open in browser" என்பதை முதலில் தேர்ந்தெடுக்கவும்.',
      'install.warnIos': 'iPhone மற்றும் iPad இல், Safari மட்டுமே ஒரு ' +
        'செயலியை முகப்புத் திரையில் சேர்க்க முடியும்.',

      'advice.title': 'நீங்கள் செய்யக்கூடியவை',
      'advice.steps': 'நடைமுறை வழிகள்',
      'advice.retest': 'மதிப்பெண்கள் மாறும். இரண்டு வாரங்கள் கழித்து மீண்டும் பரிசோதனை செய்து ஒப்பிடுங்கள்.',
      'advice.action.normal': 'இப்போது உடனடியாக எதுவும் செய்ய வேண்டியதில்லை. சில வாரங்கள் கழித்து, அல்லது நிலைமை மாறும்போது, மீண்டும் பரிசோதனை செய்யுங்கள்.',
      'advice.action.mild': 'கீழே உள்ள வழிகளை இரண்டு வாரங்களுக்குப் பின்பற்றி, பின்னர் மீண்டும் பரிசோதனை செய்து ஒப்பிட்டுப் பாருங்கள்.',
      'advice.action.moderate': 'கீழே உள்ள வழிகளைப் பின்பற்றுங்கள்; உங்கள் நிறுவனத்தில் அல்லது மருத்துவமனையில் ஒரு ஆலோசகரைச் சந்திப்பதையும் பரிசீலியுங்கள்.',
      'advice.action.severe': 'இந்த வாரமே மருத்துவர், ஆலோசகர் அல்லது மனநல நிபுணரிடம் நேரம் ஒதுக்கிக் கொள்ளுங்கள்.',
      'advice.action.extreme': 'முடிந்தவரை விரைவில் ஒரு மனநல நிபுணரிடம் பேசுங்கள். இப்போதே யாரிடமாவது பேச வேண்டும் என்றால், கீழே உள்ள எண்கள் இலவசமானவை, ரகசியமானவை.',

      'advice.depression.normal': 'உங்கள் மனச்சோர்வு மதிப்பெண் இயல்பான வரம்பில் உள்ளது. சோர்வான நாட்கள் வாழ்க்கையின் ஒரு பகுதியே; கீழ்க்கண்ட பழக்கங்கள் அவை நீடிக்காமல் இருக்க உதவும்.',
      'advice.depression.mild': 'உங்களிடம் மனச்சோர்வின் சில அறிகுறிகள் தெரிகின்றன. இது பொதுவானது; சிறிய, தொடர்ச்சியான மாற்றங்களால் பெரும்பாலும் குறையும்.',
      'advice.depression.moderate': 'மனச்சோர்வு உங்களை வெளிப்படையாகப் பாதிக்கிறது. கீழ்க்கண்ட வழிகள் உதவும்; அத்துடன் ஒரு ஆலோசகரிடம் பேசுவதும் நல்லது.',
      'advice.depression.severe': 'உங்கள் மனச்சோர்வு மதிப்பெண் அதிகம். மருத்துவர், ஆலோசகர் அல்லது மனநல நிபுணரிடம் பேசுங்கள் - இதைச் சுய உதவியால் மட்டும் சமாளிக்க வேண்டியதில்லை.',
      'advice.depression.extreme': 'உங்கள் மனச்சோர்வு மதிப்பெண் மிக அதிகம். விரைவில் ஒரு நிபுணரையோ, கீழே உள்ள உதவி எண்களையோ தொடர்பு கொள்ளுங்கள். இதை நீங்கள் தனியாக எதிர்கொள்ள வேண்டியதில்லை.',
      'advice.depression.s1': 'முன்பு நீங்கள் விரும்பிச் செய்த ஒரு சிறிய செயலை, பத்து நிமிடமாவது செய்யுங்கள். மனச்சோர்வில் ஊக்கம் வந்த பிறகு செயல் அல்ல - செயலுக்குப் பிறகே ஊக்கம் வரும்.',
      'advice.depression.s2': 'தினமும் ஒரே நேரத்தில் தூங்கி எழுங்கள் - வெறுமையாகத் தோன்றும் நாட்களிலும் கூட.',
      'advice.depression.s3': 'தினமும் வெளியே சென்று சிறிது நடமாடுங்கள். குறுகிய நடையும் போதும்.',
      'advice.depression.s4': 'இந்த வாரம் நீங்கள் உண்மையில் எப்படி உணர்ந்தீர்கள் என்பதை நம்பகமான ஒருவரிடம் சொல்லுங்கள்.',
      'advice.depression.s5': 'வேலைகளை மிகச் சிறிய படிகளாகப் பிரித்து, அந்தப் படியை முடித்ததையே ஒரு வெற்றியாகக் கருதுங்கள்.',

      'advice.anxiety.normal': 'உங்கள் பதட்ட மதிப்பெண் இயல்பான வரம்பில் உள்ளது. முக்கியமான ஒன்றுக்கு முன் பதற்றம் இருப்பது இயல்பானது, பயனுள்ளதும் கூட.',
      'advice.anxiety.mild': 'உங்களிடம் சிறிது பதட்டம் உள்ளது. கீழ்க்கண்ட வழிகள், பதட்டம் வந்த பிறகு மட்டுமல்லாமல் தினமும் பயிற்சி செய்யும்போதே சிறப்பாக வேலை செய்யும்.',
      'advice.anxiety.moderate': 'பதட்டம் உங்களை வெளிப்படையாகப் பாதிக்கிறது. கீழ்க்கண்ட வழிகளை முயற்சியுங்கள்; ஆலோசகரிடம் பேசுவதையும் பரிசீலியுங்கள்.',
      'advice.anxiety.severe': 'உங்கள் பதட்ட மதிப்பெண் அதிகம். மருத்துவர் அல்லது மனநல நிபுணரிடம் பேசுங்கள் - இந்த அளவு பதட்டம் சிகிச்சைக்கு நன்றாகப் பலனளிக்கும்.',
      'advice.anxiety.extreme': 'உங்கள் பதட்ட மதிப்பெண் மிக அதிகம். விரைவில் ஒரு நிபுணரையோ, கீழே உள்ள உதவி எண்களையோ தொடர்பு கொள்ளுங்கள்.',
      'advice.anxiety.s1': 'மூச்சை மெதுவாக்குங்கள்: நான்கு எண்ணி உள்ளிழுத்து, ஆறு எண்ணி வெளிவிடுங்கள் - இரண்டு நிமிடம். நீண்ட வெளிமூச்சே உடலை அமைதிப்படுத்துகிறது.',
      'advice.anxiety.s2': 'என்ன நடக்கும் என்று நீங்கள் பயப்படுகிறீர்கள் என்பதை எழுதுங்கள்; பிறகு உண்மையில் நடக்கக்கூடியது என்ன என்பதை எழுதுங்கள்.',
      'advice.anxiety.s3': 'காபி மற்றும் ஆற்றல் பானங்களைக் குறையுங்கள், குறிப்பாக மதியத்திற்குப் பிறகு.',
      'advice.anxiety.s4': 'நீங்கள் அஞ்சுவதை முற்றிலும் தவிர்க்காதீர்கள். சிறுகச் சிறுக அணுகுங்கள், இல்லையேல் அந்தத் தவிர்ப்பு பெரிதாகும்.',
      'advice.anxiety.s5': 'தினமும் பத்து நிமிடம் கவலைப்படுவதற்கென ஒதுக்குங்கள்; அதற்கு வெளியே வரும் கவலைகளை அந்த நேரத்திற்கு ஒத்திவையுங்கள்.',

      'advice.stress.normal': 'உங்கள் மன அழுத்த மதிப்பெண் இயல்பான வரம்பில் உள்ளது. உங்களுக்குப் பலனளிக்கும் வழக்கங்களைத் தொடருங்கள்.',
      'advice.stress.mild': 'நீங்கள் சிறிது அழுத்தத்தில் இருக்கிறீர்கள். இப்போதே செய்யும் சிறு மாற்றங்கள் அது மேலும் கூடாமல் தடுக்கும்.',
      'advice.stress.moderate': 'நீங்கள் கணிசமான அழுத்தத்தில் இருக்கிறீர்கள். ஓய்வையும் வேலைச்சுமையையும் வேண்டுமென்றே பாதுகாத்துக் கொள்ளுங்கள்; யாரிடமாவது பேசுவதையும் பரிசீலியுங்கள்.',
      'advice.stress.severe': 'உங்கள் மன அழுத்த மதிப்பெண் அதிகம். உங்கள் சுமையில் ஏதோ ஒன்று மாற வேண்டும்; அது எது என்பதைக் கண்டறிய உதவி பெறுவது நல்லது.',
      'advice.stress.extreme': 'உங்கள் மன அழுத்த மதிப்பெண் மிக அதிகம். சமாளிப்பது மட்டுமல்லாமல், நிலைமையையே மாற்ற உதவக்கூடிய ஒருவரிடம் பேசுங்கள்.',
      'advice.stress.s1': 'உங்கள் மீது உள்ள அனைத்து வேலைகளையும் எழுதுங்கள்; பிறகு இன்று உண்மையிலேயே அவசரமானவை எவை என்பதை மட்டும் குறியிடுங்கள்.',
      'advice.stress.s2': 'இந்த வாரம் ஒரு பொறுப்பை மறுத்துவிடுங்கள் அல்லது ஒத்திவையுங்கள்.',
      'advice.stress.s3': 'திரைகளிலிருந்து விலகி உண்மையான ஓய்வு எடுங்கள்: பதினைந்து நிமிடம், தொலைபேசி கைக்கு எட்டாத இடத்தில்.',
      'advice.stress.s4': 'இருபது முதல் முப்பது நிமிடம் உடலை இயக்குங்கள் - நடப்பது, சைக்கிள் ஓட்டுவது, நீந்துவது, எதுவானாலும் சரி.',
      'advice.stress.s5': 'தூங்குவதற்கு முந்தைய ஒரு மணி நேரத்தைக் காத்துக்கொள்ளுங்கள். வேலை இல்லை, படிப்பு இல்லை, தொலைபேசி உருட்டல் இல்லை.',

      'help.title': 'யாரிடமாவது பேசுங்கள்',
      'help.body': 'இந்தச் சேவைகள் இலவசம், ரகசியமானவை; பரிந்துரைக் கடிதம் தேவையில்லை.',
      'help.emergency': 'நீங்களோ வேறு யாரோ உடனடி ஆபத்தில் இருந்தால், 999 ஐ அழைக்கவும்.',
      'help.hours24': '24 மணி நேரம்',

      'details.title': 'தொடங்குவதற்கு முன்',
      'details.intro': 'உங்கள் பெயரையும் எண்ணையும் கொடுத்தால், உங்களுக்கு ஆதரவு தேவைப்படலாம் என்று முடிவு காட்டும்போது ஆலோசனைப் பிரிவு உங்களைத் தொடர்பு கொள்ள முடியும். அவற்றைக் கொடுக்காமலும் இந்தப் பரிசோதனையைச் செய்யலாம்.',
      'details.name': 'முழுப் பெயர்',
      'details.namePlaceholder': 'உங்கள் நிறுவனப் பதிவில் உள்ள பெயர்',
      'details.phone': 'தொலைபேசி எண் (WhatsApp)',
      'details.phonePlaceholder': 'எ.கா. 012-345 6789',
      'details.consent': 'என் மதிப்பெண் அதிகமாக இருந்தால், என் பெயர், எண் மற்றும் முடிவை என் நிறுவனத்தின் ஆலோசனைப் பிரிவுடன் பகிர்ந்து கொள்ள நான் ஒப்புக்கொள்கிறேன்.',
      'details.privacy': 'உங்கள் பெயரும் எண்ணும் ஒரு ஆலோசகர் உங்களைத் தொடர்பு கொள்வதற்கு மட்டுமே பயன்படுகின்றன. இந்தச் செயலியின் மற்ற பயனர்களுக்கு அவை காட்டப்படுவதில்லை; உங்கள் சார்பாக இந்தச் செயலி எதையும் அனுப்புவதில்லை.',
      'details.continue': 'தொடரவும்',
      'details.skip': 'என் விவரங்கள் இல்லாமல் தொடரவும்',
      'details.errName': 'உங்கள் பெயரை உள்ளிடவும், அல்லது விவரங்கள் இல்லாமல் தொடர்வதைத் தேர்ந்தெடுக்கவும்.',
      'details.errPhone': 'ஆலோசகர் உங்களைத் தொடர்பு கொள்ளக்கூடிய தொலைபேசி எண்ணை உள்ளிடவும்.',
      'details.errConsent': 'பெட்டியில் குறியிடவும், அல்லது விவரங்கள் இல்லாமல் தொடர்வதைத் தேர்ந்தெடுக்கவும்.',

      'followup.title': 'ஒரு ஆலோசகரிடம் பேச விரும்புகிறீர்களா?',
      'followup.body': 'யாரிடமாவது பேசுவது உதவும் அளவுக்கு உங்கள் மதிப்பெண் அதிகமாக உள்ளது. கீழே உள்ள பொத்தான் WhatsApp ஐத் திறக்கும்; உங்கள் முடிவு ஏற்கெனவே எழுதப்பட்டிருக்கும் - நீங்கள் அனுப்பு என்பதை அழுத்தினால் போதும்.',
      'followup.chat': 'WhatsApp இல் ஆலோசகருடன் பேசுங்கள்',
      'followup.later': 'இப்போது வேண்டாம்',
      'followup.noNumber': 'இந்தச் செயலியில் ஆலோசகர் எண் இன்னும் அமைக்கப்படவில்லை. மேலே உள்ள 24 மணி நேர உதவி எண்கள் அனைவருக்கும் திறந்திருக்கின்றன.',

      'wa.heading': 'SentiQ 21 - ஆலோசனை ஆதரவுக்கான கோரிக்கை',
      'wa.name': 'பெயர்',
      'wa.phone': 'தொலைபேசி',
      'wa.date': 'பரிசோதனை தேதி',
      'wa.results': 'DASS-21 முடிவு',
      'wa.closing': 'நான் ஆலோசனை ஆதரவைப் பெற விரும்புகிறேன்.',
      'wa.notGiven': 'கொடுக்கப்படவில்லை',

      'q1': 'நான் அமைதியடைவது கடினமாக இருந்தது',
      'q2': 'என் வாய் வறண்டு போவதை உணர்ந்தேன்',
      'q3': 'எந்தவொரு நேர்மறையான உணர்வையும் என்னால் உணர முடியவில்லை',
      'q4': 'எனக்கு மூச்சுவிடுவதில் சிரமம் ஏற்பட்டது',
      'q5': 'ஏதாவது செய்வதற்கான ஊக்கத்தைப் பெறுவது கடினமாக இருந்தது',
      'q6': 'சூழ்நிலைகளுக்கு நான் அளவுக்கு அதிகமாக எதிர்வினையாற்றினேன்',
      'q7': 'எனக்கு நடுக்கம் ஏற்பட்டது',
      'q8': 'நான் அதிக பதட்ட சக்தியைச் செலவிடுவதாக உணர்ந்தேன்',
      'q9': 'நான் பீதியடையக்கூடிய சூழ்நிலைகளைப் பற்றிக் கவலைப்பட்டேன்',
      'q10': 'எதிர்பார்ப்பதற்கு எதுவும் இல்லை என்று உணர்ந்தேன்',
      'q11': 'நான் எளிதில் எரிச்சலடைவதை உணர்ந்தேன்',
      'q12': 'ஓய்வெடுப்பது கடினமாக இருந்தது',
      'q13': 'நான் சோர்வாகவும் மனச்சோர்வாகவும் உணர்ந்தேன்',
      'q14': 'நான் செய்துகொண்டிருந்ததைத் தடுக்கும் எதையும் என்னால் பொறுத்துக்கொள்ள முடியவில்லை',
      'q15': 'நான் பீதியடைவதற்கு நெருக்கமாக இருப்பதாக உணர்ந்தேன்',
      'q16': 'எதைப் பற்றியும் ஆர்வம் கொள்ள என்னால் முடியவில்லை',
      'q17': 'ஒரு மனிதராக எனக்குப் பெரிய மதிப்பு இல்லை என்று உணர்ந்தேன்',
      'q18': 'நான் மிக எளிதில் மனம் புண்படுவதாக உணர்ந்தேன்',
      'q19': 'என் இதயத் துடிப்பை நான் உணர்ந்தேன்',
      'q20': 'எந்தத் தகுந்த காரணமும் இல்லாமல் நான் பயந்தேன்',
      'q21': 'வாழ்க்கை அர்த்தமற்றது என்று உணர்ந்தேன்',
    },

    zh: {
      'lang.label': '语言',

      'home.welcome': '欢迎使用',
      'home.instructions': '说明',
      'home.p1': '请阅读每一项陈述，并选择一个数字（0 到 3），表示在过去一周内' +
        '该陈述在多大程度上适用于你。',
      'home.p2': '答案没有对错之分。请不要在任何一项陈述上花太多时间。',
      'home.ratingTitle': '评分标准：',
      'home.start': '开始 DASS-21',
      'home.history': '查看以往结果',
      'home.install': '安装到手机',

      'scale.0': '0 - 完全不适用于我',
      'scale.1': '1 - 有些适用于我，或偶尔如此',
      'scale.2': '2 - 相当适用于我，或经常如此',
      'scale.3': '3 - 非常适用于我，或大部分时间如此',

      'quiz.title': 'DASS-21',
      'quiz.progress': '已回答 {done} / {total}',
      'quiz.submit': '提交',
      'quiz.missing': '请先回答第 {n} 题。',
      'quiz.back': '返回',

      'result.title': '结果',
      'result.heading': '你的 DASS-21 分数',
      'result.print': '打印 PDF',
      'result.back': '返回',
      'result.disclaimer': 'DASS-21 不能取代面对面的临床诊断。如果你正经历明显的' +
        '情绪困扰，请咨询医生或合格的心理健康专业人员。',
      'result.saving': '正在保存到你的账户…',
      'result.saved': '已保存到你的账户。',
      'result.savedLocal': '已保存在本设备。恢复联网后会自动同步。',

      'history.title': '历史记录',
      'history.clear': '清除本设备上的记录',
      'history.empty': '尚未保存任何结果。完成一次 DASS-21 测评后即会显示在这里。',
      'history.confirm': '确定删除本设备上保存的所有结果吗？',
      'history.cleared': '记录已清除。',

      'subscale.depression': '抑郁',
      'subscale.anxiety': '焦虑',
      'subscale.stress': '压力',

      'severity.normal': '正常',
      'severity.mild': '轻度',
      'severity.moderate': '中度',
      'severity.severe': '重度',
      'severity.extreme': '极重度',

      'print.title': 'DASS-21 结果',
      'print.about': '关于 DASS-21',
      'print.p2': 'DASS-21 由三个自评量表组成，用于测量抑郁、焦虑和压力三种情绪' +
        '状态。它不作疾病诊断，只根据症状衡量其严重程度。',

      'install.title': '安装 SentiQ 21',
      'install.sub': '把它添加到主屏幕，像普通应用一样打开 — 没有网络也能使用。',
      'install.now': '立即安装',
      'install.android': 'Android',
      'install.ios': 'iPhone / iPad',
      'install.close': '关闭',
      'install.warnInApp': '你是从另一个应用内部打开的，在那里无法安装。' +
        '请点击菜单，先选择 "Open in browser"。',
      'install.warnIos': '在 iPhone 和 iPad 上，只有 Safari 才能把应用添加到主屏幕。',

      'advice.title': '你可以做什么',
      'advice.steps': '实用做法',
      'advice.retest': '分数是会变的。两周后再测一次，比较看看。',
      'advice.action.normal': '目前不需要特别处理。过几周，或情况有变化时，再做一次测评。',
      'advice.action.mild': '试着照下面的做法坚持两周，然后再测一次，比较一下。',
      'advice.action.moderate': '照下面的做法去做，并考虑预约学校或诊所的辅导员谈一谈。',
      'advice.action.severe': '请在本周内预约医生、辅导员或心理健康专业人员。',
      'advice.action.extreme': '请尽快联系心理健康专业人员。如果你现在就需要找人说说话，下面的电话是免费且保密的。',

      'advice.depression.normal': '你的抑郁分数在正常范围内。心情低落的日子本来就是生活的一部分，下面这些习惯有助于不让它停留太久。',
      'advice.depression.mild': '你出现了一些情绪低落的迹象。这很常见，通常通过小而持续的改变就会好转。',
      'advice.depression.moderate': '情绪低落已经明显影响到你。下面的做法仍然有用，但也值得找辅导员谈一谈。',
      'advice.depression.severe': '你的抑郁分数偏高。请找医生、辅导员或心理健康专业人员谈谈 - 这已经不是单靠自助该承担的程度。',
      'advice.depression.extreme': '你的抑郁分数很高。请尽快联系专业人员，或拨打下面的求助热线。你不必独自面对这件事。',
      'advice.depression.s1': '做一件你以前喜欢的小事，哪怕只有十分钟。情绪低落时，通常是先行动，动力才跟上来，而不是反过来。',
      'advice.depression.s2': '每天保持相同的作息时间，即使是那些感觉空空的日子。',
      'advice.depression.s3': '每天出门活动一下，散一会儿步也算。',
      'advice.depression.s4': '找一个你信任的人，告诉他你这一周真实的感受。',
      'advice.depression.s5': '把任务拆成最小的一步，完成那一步就算完成。',

      'advice.anxiety.normal': '你的焦虑分数在正常范围内。在重要的事情面前感到紧张是正常的，甚至是有用的。',
      'advice.anxiety.mild': '你带着一些焦虑。下面的做法在每天练习时效果最好，而不是等到已经焦虑了才用。',
      'advice.anxiety.moderate': '焦虑已经明显影响到你。试试下面的做法，也可以考虑找辅导员谈谈。',
      'advice.anxiety.severe': '你的焦虑分数偏高。请找医生或心理健康专业人员谈谈 - 这个程度的焦虑对治疗的反应通常很好。',
      'advice.anxiety.extreme': '你的焦虑分数很高。请尽快联系专业人员，或拨打下面的求助热线。',
      'advice.anxiety.s1': '放慢呼吸：吸气数四拍，呼气数六拍，持续两分钟。让身体平静下来的，正是更长的呼气。',
      'advice.anxiety.s2': '写下你担心会发生什么，再写下最有可能真正发生的是什么。',
      'advice.anxiety.s3': '减少咖啡因和能量饮料，特别是中午以后。',
      'advice.anxiety.s4': '不要完全回避你害怕的事。一小步一小步地接近它，否则回避只会越来越大。',
      'advice.anxiety.s5': '每天留出十分钟专门用来担心，其余时间把担心先放到那十分钟里。',

      'advice.stress.normal': '你的压力分数在正常范围内。继续保持那些对你有效的作息。',
      'advice.stress.mild': '你承受着一些压力。现在做一些小调整，通常就能避免它继续累积。',
      'advice.stress.moderate': '你承受着相当大的压力。有意识地保护你的休息时间和工作量，也可以考虑找人谈一谈。',
      'advice.stress.severe': '你的压力分数偏高。你的负担里有些东西需要改变，值得找人帮你理清是哪一部分。',
      'advice.stress.extreme': '你的压力分数很高。请找一个能帮你改变处境的人谈谈，而不只是硬撑下去。',
      'advice.stress.s1': '把手上所有的事写下来，然后只标出今天真正紧急的那几件。',
      'advice.stress.s2': '这一周拒绝或推迟一项安排。',
      'advice.stress.s3': '真正地离开屏幕休息一下：十五分钟，手机放远一点。',
      'advice.stress.s4': '让身体动起来，二十到三十分钟 - 走路、骑车、游泳，什么都行。',
      'advice.stress.s5': '守住睡前那一个小时。不工作，不温习，不刷手机。',

      'help.title': '找人谈谈',
      'help.body': '这些服务免费且保密，也不需要转介信。',
      'help.emergency': '如果你或他人正处于紧急危险中，请拨打 999。',
      'help.hours24': '24 小时',

      'details.title': '开始之前',
      'details.intro': '如果你留下姓名和号码，当结果显示你可能需要支持时，辅导组就能联系你。你也可以不填，直接做测评。',
      'details.name': '全名',
      'details.namePlaceholder': '与学校记录一致的姓名',
      'details.phone': '电话号码（WhatsApp）',
      'details.phonePlaceholder': '例如 012-345 6789',
      'details.consent': '我同意：若我的分数偏高，我的姓名、号码和结果可以提供给学校的辅导组。',
      'details.privacy': '你的姓名和号码只用于让辅导员联系你，不会展示给本应用的其他使用者，本应用也不会以你的名义发送任何内容。',
      'details.continue': '继续',
      'details.skip': '不填写，直接继续',
      'details.errName': '请输入姓名，或选择不填写直接继续。',
      'details.errPhone': '请输入辅导员可以联系到你的电话号码。',
      'details.errConsent': '请勾选该选项，或选择不填写直接继续。',

      'followup.title': '想和辅导员谈谈吗？',
      'followup.body': '你的分数已经高到值得找人谈一谈。点击下面的按钮会打开 WhatsApp，你的结果已经写好了 - 你只需要按发送。',
      'followup.chat': '在 WhatsApp 上联系辅导员',
      'followup.later': '暂时不用',
      'followup.noNumber': '本应用尚未设置辅导员号码。上面的 24 小时求助热线对任何人开放。',

      'wa.heading': 'SentiQ 21 - 辅导支持申请',
      'wa.name': '姓名',
      'wa.phone': '电话',
      'wa.date': '测评日期',
      'wa.results': 'DASS-21 结果',
      'wa.closing': '我希望获得辅导支持。',
      'wa.notGiven': '未提供',

      'q1': '我觉得很难让自己平静下来',
      'q2': '我感到口干',
      'q3': '我似乎完全感受不到任何愉快的感觉',
      'q4': '我感到呼吸困难',
      'q5': '我觉得很难提起劲去做事情',
      'q6': '我对事情的反应过度',
      'q7': '我感到身体颤抖',
      'q8': '我觉得自己耗费了很多精神在紧张上',
      'q9': '我担心自己会在某些场合惊慌失措',
      'q10': '我觉得没有什么可以期待的',
      'q11': '我发觉自己容易烦躁不安',
      'q12': '我觉得很难放松',
      'q13': '我感到情绪低落、忧郁',
      'q14': '我无法忍受任何妨碍我做事的事情',
      'q15': '我觉得自己快要恐慌了',
      'q16': '我对任何事情都提不起热情',
      'q17': '我觉得自己作为一个人没有什么价值',
      'q18': '我觉得自己相当容易被激怒',
      'q19': '我能感觉到自己的心跳',
      'q20': '我无缘无故感到害怕',
      'q21': '我觉得生命没有意义',
    },
  };

  var STEPS = {
    en: {
      android: [
        ['Open this page in ', 'Google Chrome'],
        ['Tap the ', 'Menu', ' icon (three dots) in the top right corner'],
        ['Select ', 'Add to Home screen', ' or ', 'Install app'],
        ['Tap ', 'Install', ' to confirm — the SentiQ 21 icon appears on your home screen'],
      ],
      ios: [
        ['Open this page in ', 'Safari', ' (not Chrome or Firefox)'],
        ['Tap the ', 'Share', ' icon in the Safari menu bar'],
        ['Scroll down and select ', 'Add to Home Screen'],
        ['Tap ', 'Add', ' — the SentiQ 21 icon appears on your home screen'],
      ],
    },
    ms: {
      android: [
        ['Buka halaman ini dalam ', 'Google Chrome'],
        ['Tekan ikon ', 'Menu', ' (tiga titik) di penjuru kanan atas'],
        ['Pilih ', 'Add to Home screen', ' atau ', 'Install app'],
        ['Tekan ', 'Install', ' untuk sahkan — ikon SentiQ 21 akan muncul di skrin utama'],
      ],
      ios: [
        ['Buka halaman ini dalam ', 'Safari', ' (bukan Chrome atau Firefox)'],
        ['Tekan ikon ', 'Share', ' pada bar menu Safari'],
        ['Skrol ke bawah dan pilih ', 'Add to Home Screen'],
        ['Tekan ', 'Add', ' — ikon SentiQ 21 akan muncul di skrin utama'],
      ],
    },
    ta: {
      android: [
        ['இந்தப் பக்கத்தை ', 'Google Chrome', ' இல் திறக்கவும்'],
        ['மேல் வலது மூலையில் உள்ள ', 'Menu', ' (மூன்று புள்ளிகள்) ஐத் தட்டவும்'],
        ['', 'Add to Home screen', ' அல்லது ', 'Install app', ' ஐத் தேர்ந்தெடுக்கவும்'],
        ['', 'Install', ' ஐத் தட்டி உறுதிப்படுத்தவும் — SentiQ 21 சின்னம் முகப்புத் திரையில் தோன்றும்'],
      ],
      ios: [
        ['இந்தப் பக்கத்தை ', 'Safari', ' இல் திறக்கவும் (Chrome அல்லது Firefox அல்ல)'],
        ['Safari மெனுப் பட்டியில் உள்ள ', 'Share', ' சின்னத்தைத் தட்டவும்'],
        ['கீழே உருட்டி ', 'Add to Home Screen', ' ஐத் தேர்ந்தெடுக்கவும்'],
        ['', 'Add', ' ஐத் தட்டவும் — SentiQ 21 சின்னம் முகப்புத் திரையில் தோன்றும்'],
      ],
    },
    zh: {
      android: [
        ['在 ', 'Google Chrome', ' 中打开此页面'],
        ['点击右上角的 ', 'Menu', ' 图标（三个点）'],
        ['选择 ', 'Add to Home screen', ' 或 ', 'Install app'],
        ['点击 ', 'Install', ' 确认 — SentiQ 21 图标就会出现在主屏幕上'],
      ],
      ios: [
        ['在 ', 'Safari', ' 中打开此页面（不是 Chrome 或 Firefox）'],
        ['点击 Safari 菜单栏中的 ', 'Share', ' 图标'],
        ['向下滚动并选择 ', 'Add to Home Screen'],
        ['点击 ', 'Add', ' — SentiQ 21 图标就会出现在主屏幕上'],
      ],
    },
  };

  var STORAGE_KEY = 'sentiq21.lang';
  var DEFAULT = 'ms';
  var listeners = [];
  var current = DEFAULT;
  /* False until the person picks a language for themselves, which is what
   * decides whether the first-run chooser opens. */
  var chosen = false;

  function known(code) {
    return LANGS.some(function (entry) {
      return entry.code === code;
    });
  }

  function detect() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      /* private mode - fall through to the browser's own preference */
    }
    if (known(stored)) {
      chosen = true;
      return stored;
    }

    var tags = (global.navigator && navigator.languages) ||
      [(global.navigator && navigator.language) || ''];
    for (var i = 0; i < tags.length; i++) {
      var base = String(tags[i]).toLowerCase().split('-')[0];
      if (base === 'ms' || base === 'id') return 'ms';
      if (base === 'ta') return 'ta';
      if (base === 'zh') return 'zh';
      if (base === 'en') return 'en';
    }
    return DEFAULT;
  }

  function fill(text, vars) {
    if (!vars) return text;
    return text.replace(/\{(\w+)\}/g, function (match, name) {
      return Object.prototype.hasOwnProperty.call(vars, name)
        ? String(vars[name])
        : match;
    });
  }

  function tIn(lang, key, vars) {
    var table = DICT[lang] || DICT.en;
    var text = table[key];
    if (text === undefined) text = DICT.en[key];
    if (text === undefined) return key;
    return fill(text, vars);
  }

  function t(key, vars) {
    return tIn(current, key, vars);
  }

  function steps(platform) {
    var table = STEPS[current] || STEPS.en;
    return table[platform] || STEPS.en[platform];
  }

  /* Rewrites every element carrying a data-i18n attribute. */
  function apply() {
    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (node) {
      node.setAttribute('aria-label', t(node.dataset.i18nAria));
    });

    var entry = LANGS.filter(function (item) {
      return item.code === current;
    })[0];
    document.documentElement.lang = entry ? entry.html : current;
  }

  function setLang(code) {
    if (!known(code)) return;

    /* Recorded even when the code matches what is already showing, so that
     * confirming the pre-selected language still counts as a choice. */
    chosen = true;
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (error) {
      /* the choice just will not survive a reload */
    }

    if (code === current) return;
    current = code;
    apply();
    listeners.forEach(function (fn) {
      fn(current);
    });
  }

  current = detect();

  global.I18N = {
    LANGS: LANGS,
    DEFAULT: DEFAULT,
    DICT: DICT,
    STEPS: STEPS,
    t: t,
    tIn: tIn,
    steps: steps,
    apply: apply,
    setLang: setLang,
    get lang() {
      return current;
    },
    get hasChosen() {
      return chosen;
    },
    onChange: function (fn) {
      listeners.push(fn);
    },
  };
})(window);
