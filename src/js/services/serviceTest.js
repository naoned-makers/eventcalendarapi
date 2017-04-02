import { Service } from "threerest";
import { Methods } from "threerest";
import { Hal } from "threerest";
import { Pagination } from "threerest";



@Service.path("/test")
export default class ServiceTest {

  @Methods.get("/")
  @Hal.halServiceMethod()
  test() {
    return "it's work !!!"; 
  }

}
