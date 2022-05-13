import styled from 'styled-components'

const Styles = styled.div`
  wrapper {
    margin: 0 auto
    padding: 40px
    max-width: 800px
  }
 table {
    margin: 0 0 40px 0
    width: 100%
    box-shadow: 0 1px 3px rgba(0,0,0,0.2)
    display: table
    @media screen and (max-width: 580px)
      display: block

   tr {
     :last-child {
       td {
         border-bottom: 0;
       }
     }
   }

   th,
   td {
     padding: 0.5rem;
     border-bottom: 1px solid black;
     border-right: 1px solid black;

     :last-child {
       border-right: 0;
     }
   }
  
   th {
     background: #2980b9;
     color: white;
     fontWeight: bold;
   }
 }
`
export default Styles