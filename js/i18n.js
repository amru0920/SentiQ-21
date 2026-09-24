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
