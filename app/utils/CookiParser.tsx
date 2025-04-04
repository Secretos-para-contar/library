export function CookieParser(cookieArr: string) {
  const cookieObj: { [key: string]: string } = {}

  cookieArr.split(";").forEach((cookie) => {
    const [key, value] = cookie.split("=")
    cookieObj[key.trim()] = value
  })

  return cookieObj
}
