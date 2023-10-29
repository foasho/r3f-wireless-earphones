

export const Header = () => {

  return (
    <div className="absolute top-0 w-screen left-0 z-10">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <img src="/logo.jpg" className="w-8 h-8 rounded-full select-none" />
          </div>
          <span className="pl-2 text-2xl font-bold md:text-4xl text-gray-800 select-none">
            Earphones
          </span>
        </div>
        <div className="flex items-center">
          <a 
            className="pr-3 select-none text-gray-800" href="https://dova-s.jp/bgm/play7330.html" 
            target="_blank" rel="noreferrer"
          >
              カナリアスキップ 
              <span className="hidden md:inline">/ まんぼう二等兵</span>
              <span className="inline md:hidden">♪</span>
          </a>
        </div>
      </div>
    </div>
  )
}