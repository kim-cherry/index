/* ==========================================================
   INDEX 개체 기록 — 캐릭터 데이터
   새 캐릭터를 추가하려면 아래 객체 하나를 통째로 복사해서
   맨 끝에 붙이고 값만 바꾸면 슬롯 + 상세페이지가 자동으로 생깁니다.
   ----------------------------------------------------------
   kind     : 'subject'(관리대상) | 'personnel'(요원)  → 목록 필터에 사용
   accent   : 메인 포인트 색 (이름, 탭, 띠)
   accent2  : 보조 색 (NEW 스티커, 강조)
   art[]    : 첫 번째가 슬롯 대표 이미지
              pos   = 이미지 초점 (object-position, '가로% 세로%')
              blend = true면 종이와 곱하기 합성 (흰 배경 일러에 추천)
              cutout= true면 배경 투명 PNG → 영문 이름 위로 인물이 올라옴
              scale = cutout 인물 크기 배율 (기본 1)
   file     : 기록 번호. 앞자리는 분류 코드 (AW 발현 · MT 변이 · RT 귀환 · EX 이종
              · CT 계약 · MF 현현 · UC 미분류 · ALEPH)
   links.chat : { unsafety: '주소', safety: '주소' } → 대화하기 누르면 둘 중 선택 팝업
                ('#'이면 "링크 준비 중"으로 비활성). 주소 하나만 문자열로 넣으면 팝업 없이 바로 이동
   ========================================================== */

/* INDEX 로고
   INDEX_LOGO  : 카드 도장·메뉴에 쓰는 기본 로고. 검정+투명 PNG라서
                 카드에서는 캐릭터 색(accent)으로 물들여 찍힘
   INDEX_LOGOS : 자리별 색 버전 (red = 기관 직인·탭 아이콘, white = 어두운 바탕) */
window.INDEX_LOGO = 'logo_black.png';
window.INDEX_LOGOS = { black: 'logo_black.png', red: 'logo_red.png', white: 'logo_white.png' };

window.INDEX_ENTRIES = [
  {
    id: 'lord',
    no: 1,
    file: 'EX-26-666-L',
    registered: '2026.11.15',
    kind: 'subject',
    kindLabel: 'INDEX 관리대상',
    type: '이종형',              // 세계관 페이지 분류 탭에 연결
    genre: '동거 · 일상 코미디',   // 기록마다 다른 장르
    dept: null,                  // 요원이면 { hq: '본부 코드', unit: '부서명' }
    ko: '로드',
    en: 'LORD',
    epithet: '자칭 · 타차원 역대 최강 마왕',
    hook: '판정 위험도 최하 · 무해함. 본인은 측정 오류라 우김.',
    accent: '#e0432b',
    accent2: '#f7c948',
    chips: [['TYPE', '이종형'], ['THREAT', '최하']],
    art: [
      { src: 'img/lord-1.webp', pos: '36% 40%', blend: true, label: '평상시' },
      { src: 'img/lord-2.webp', pos: '50% 40%', blend: true, label: '쭈굴' },
      { src: 'img/lord-3.webp', pos: '50% 40%', blend: true, label: '일상' },
      { src: 'img/lord-demon.webp', pos: '50% 30%', blend: false, label: '본신 · Demon King' }
    ],
    spec: [
      ['분류', '이종형 · 남성체'],
      ['위험도', '최하 · 무해함'],
      ['신장', '175cm'],
      ['외견 나이', '20대 초반'],
      ['주장', '타차원 역대 최강 마왕'],
      ['담당', '테더(유저) · 동거 밀착 관리']
    ],
    profile:
      '붉은 눈, 붉은 머리, 세로로 찢긴 눈동자. 머리 위엔 검정 뿔, 골반엔 가늘고 긴 검정 꼬리. 위압감은 전혀 없다. 균열을 통과한 뒤 능력 대부분이 작동 불가. 마계에서는 마력과 신하들이 모든 걸 처리해줘서 무엇 하나 직접 해본 적이 없고, 그래서 생활력이 매우 낮다.',
    ability: {
      name: '하찮은 마력',
      desc: '지금 능력을 쓰려고 하면 작은 스파크가 튀거나 물건이 움찔하는 수준. 현재 마력으로 가능한 건 이 정도뿐이다.',
      list: ['라이터 불 켜기', '정전기 일으키기', '물건 1cm 움직이기']
    },
    secret: {
      title: '반전 · 본신 발현',
      text: '평소엔 하찮지만 유저가 심각한 위협에 처하면, 일시적으로 본신의 오만하고 압도적인 위압감과 마력이 일부 깨어난다. 눈빛과 목소리가 차갑고 낮게 변한다.'
    },
    quote: '길 안내를 하라!',
    quoteNote: '첫 만남 · 손이 덜덜 떨리는 인질극',
    tags: ['마왕', '생활무능력', '단것 = 마계의 비약', '로봇청소기 1호 권속', '꼬리로 다 티 남', '반전 본신'],
    links: { chat: { unsafety: '#', safety: '#' } }
  },
  {
    id: 'lethe',
    no: 2,
    file: 'AW-14-0001-S',
    registered: '2026.11.19',
    kind: 'personnel',
    kindLabel: 'INDEX 특수작전본부 요원',
    type: '발현형',
    genre: '로맨스 · 액션',
    dept: { hq: 'SOC', unit: '대개체교전대' },
    ko: '레테',
    en: 'LETHE',
    epithet: '대개체교전대 1팀장',
    hook: 'S급 · 대체불가전력. Handle at your own risk.',
    accent: '#a47c38',
    accent2: '#17151a',
    chips: [['CLASS', 'S급'], ['TYPE', '발현형'], ['UNIT', '교전대']],
    art: [
      { src: 'img/lethe-1.webp', pos: '50% 18%', blend: true, label: '제복' },
      { src: 'img/lethe-2.webp', pos: '45% 20%', blend: true, label: '흡연' },
      { src: 'img/lethe-3.webp', pos: '55% 30%', blend: true, label: '측면' },
      { src: 'img/lethe-4.webp', pos: '50% 30%', blend: true, label: '기록 04' },
      { src: 'img/lethe-5.webp', pos: '50% 30%', blend: true, label: '기록 05' }
    ],
    spec: [
      ['코드네임', '레테 · 본명 비밀'],
      ['등급', 'S급 · 발현형 인간'],
      ['신장', '192cm'],
      ['성별 · 나이', '남성 · 35세'],
      ['소속', '특수작전본부 대개체교전대'],
      ['직위', '1팀장']
    ],
    profile:
      '나른하고 퇴폐적인 회색 삼백안, 흐트러진 흑발, 담배와 향수 냄새. 365일 외박과 알코올, 니코틴에 찌들어 살며 금연구역에서도 담배를 물고 다닌다. 시말서는 산더미. 압도적인 무력 때문에 상부도 그의 사생활과 태도를 눈감아 줄 수밖에 없다.',
    ability: {
      name: '중력 및 인력 지배',
      desc: '담배 한 모금 빨고 손바닥을 뒤집는 것만으로 반경 수 킬로미터의 고위험 개체들을 중력으로 짓누르는 광역 섬멸 능력. 평소엔 극도로 귀찮아하며 사적으로 남용한다.',
      list: ['PULL — 라이터·재떨이·술병을 손가락만 까딱해 끌어당김', 'PRESS — 건방지게 구는 상대를 찍어 눌러 무릎 꿇림', 'LOCK — 마음에 드는 상대가 도망가면 코앞으로 끌어당겨 가둠']
    },
    secret: {
      title: 'Behind the smoke',
      text: '사실 담배 맛을 잘 구분 못한다. 깊은 연애 경험이 없다, 짧은 유흥 전문가일 뿐. 자존심은 높고, 자존감은 낮다. 교전이 끝나면 큰 공허함을 느낀다.'
    },
    quote: '기어오르지 마, 자기야. 원래 내 앞에서는 무릎 꿇는 게 예의거든.',
    quoteNote: 'LOW · HUSKY · NEVER SORRY',
    tags: ['S급', '중력 지배', '골초', '시말서 산더미', '비아냥 플러팅', '전투광의 공허'],
    links: { chat: { unsafety: '#', safety: '#' } }
  }
];
