// import { RegisterAccountHeader } from "@/components/register-account/Header";
// import {
//   Container,
//   Main,
//   PlanBenefits,
//   PlanButton,
//   PlanCard,
//   PlanCardHeader,
//   PlanPrice,
// } from "./styles";
// import { Footer } from "@/components/register-account/Footer";
// import Image from "next/image";

// import { FollowerData } from "@/components/home/midias-sociais/FollowerData";

// export default function Test() {
//   const cards = [1, 2, 3];

//   return (
//     <Container>
//       <RegisterAccountHeader />
//       <Main>
//         {cards.map((card) => (
//           <PlanCard>
//             <PlanCardHeader>
//               <Image width={285} height={56} src={"/axionLogo.png"} alt="" />
//               <strong>Essencial</strong>
//             </PlanCardHeader>
//             <PlanPrice>
//               <div>
//                 <span>De</span>{" "}
//                 <strong
//                   style={{
//                     fontSize: "1.5rem",
//                     color: "#0D123C",
//                   }}
//                 >
//                   R$ 30.950,00
//                 </strong>{" "}
//                 <span>por</span>
//               </div>
//               <div>
//                 <span>12x</span>{" "}
//                 <strong
//                   style={{
//                     fontSize: "1.75rem",
//                     color: "#03AE00",
//                   }}
//                 >
//                   R$2.199,90
//                 </strong>{" "}
//               </div>
//               <div>
//                 <span
//                   style={{
//                     fontSize: "0.75rem",
//                   }}
//                 >
//                   à vista
//                 </span>{" "}
//                 <strong
//                   style={{
//                     fontSize: "1.125rem",
//                   }}
//                 >
//                   R$ 25.000,00{" "}
//                 </strong>
//               </div>
//             </PlanPrice>

//             <div
//               style={{
//                 height: "2px",
//                 width: "85%",
//                 backgroundColor: "#0D123C",
//                 margin: "1.5rem auto 0.75rem",
//               }}
//             />
//             <PlanBenefits>
//               <ul>
//                 <li>Benefício 1</li>
//                 <li>Benefício 2</li>
//                 <li>Beneficio 3</li>
//                 <li>Beneficio 4</li>
//                 <li>Beneficio 5</li>
//                 <li>Beneficio 6</li>
//                 <li>Beneficio 7</li>
//               </ul>
//             </PlanBenefits>
//             <PlanButton>
//               <button>Assinar</button>
//             </PlanButton>
//           </PlanCard>
//         ))}
//       </Main>
//       <Footer />
//     </Container>
//   );
//

// export default function Test() {
//   const followerData = [
//     { name: "Instagram", count: 40000 },
//     { name: "Facebook", count: 30000 },
//     { name: "Youtube", count: 20000 },
//     { name: "Tiktok", count: 10000 },
//   ];

//   return (
//     <div style={{}}>
//       <FollowerData data={followerData} />
//     </div>
//   );
// }

export default function Test() {
  return (
    <div className="flex items-center justify-center w-[200px] h-64"></div>
  );
}
