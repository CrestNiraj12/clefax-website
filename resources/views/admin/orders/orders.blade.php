@extends('layouts.admin')

@section('content')

<!-- Main content -->
<section class="content">

    <!-- Default box -->
    <div class="card">
    <div class="card-body p-0">
        <table class="min-w-max w-full table-auto">
            <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-center">
                        Order No.
                    </th>
                    <th class="py-3 px-6 text-left">
                        Customer
                    </th>
                    <th class="py-3 px-6 text-center">
                        Products
                    </th>
                    <th class="py-3 px-6 text-center">
                        Status
                    </th>
                    {{-- <th class="py-3 px-6 text-left">
                        Subtotal
                    </th> --}}
                    <th class="py-3 px-6 text-center">
                        Total
                    </th>
                    <th class="py-3 px-6 text-center">
                        Collection Slot
                    </th>
                    <th class="py-3 px-6 text-center"></th>
                </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
                @if (count($orders) > 0)
                    @foreach ($orders as $order)
                    @if (count($order->products) > 0)
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-center">
                           <p>{{str_pad($order->id, 4, '0', STR_PAD_LEFT)}}</p>
                        </td>
                        <td class="py-3 px-6 text-left">
                            <p>{{ $order["user"]["fullname"] }}</p>
                        </td>
                         <td class="py-3 px-6 text-center">
                            <div class="flex items-center justify-center">
                                @foreach ($order->products as $product)
                                    <img class="w-6 h-6 rounded-full  {{$loop->index > 0 ? "-m-1" : ""}} transform hover:scale-125" src="{{ $product['images'][0] }}" alt="{{ $product->name }}" /> 
                                @endforeach
                            </div>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none {{ $order["status"] == "0" ? "text-indigo-100 bg-indigo-700" : "text-green-100 bg-green-700"}} rounded">{{ $order["status"] == "0" ? "Processing" : "Delivered"}}</span>
                        </td>
                        {{-- <td class="py-3 px-6 text-left">
                            <p>£{{ $order["subtotal"] }}</p>
                        </td> --}}
                        <td class="py-3 px-6 text-center">
                           <p>£@convert($order["total"])</p>
                        </td>
                        <td class="py-3 px-6 text-center">
                            {{ $order["date"]->format('Y-m-d') }} {{ $order["collection_slot"]["times"] }}
                        </td>
                        <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center ">
                                <a target="_blank" href="/invoice/?oid={{ $order->id }}&user_id={{ $order["user"]["id"] }}" class="cursor-pointer w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </a>
                                @if ($order->status == "0" && auth()->user()->role == "Trader")
                                    <form method="POST" action="/admin/order/complete/{{ $order->id }}">
                                        @method('PUT')
                                        @csrf
                                        <button type="submit" class="cursor-pointer w-4 mr-2 transform hover:text-green-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                                                <path d="M12.32,26.5a3.32,3.32,0,0,1-2.36-1l-7-7a3.35,3.35,0,0,1,0-4.72,3.4,3.4,0,0,1,4.72,0l4.64,4.64,12-12a3.42,3.42,0,0,1,4.7,0,3.35,3.35,0,0,1,0,4.71h0L14.68,25.52A3.32,3.32,0,0,1,12.32,26.5Zm-7-11.66a1.32,1.32,0,0,0-.94.4,1.35,1.35,0,0,0,0,1.89l7,7a1.34,1.34,0,0,0,1.89,0L27.61,9.78a1.35,1.35,0,0,0,0-1.89,1.37,1.37,0,0,0-1.88,0L13,20.57a1,1,0,0,1-1.41,0L6.28,15.23A1.34,1.34,0,0,0,5.33,14.83Zm23-4.35h0Z"/>
                                            </svg>
                                        </button>
                                    </form>
                                @endif
                                {{-- <a href="/admin/orders/{{ $order['id'] }}/edit" class="w-4 mr-2 transform hover:text-purple-500 cursor-pointer hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </a>
                                
                                <button class="w-4 mr-2 transform hover:text-red-500 cursor-pointer hover:scale-110 showDelBtn" type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button> --}}
                            </div>
                            {{-- <a class="btn btn-info btn-sm" href="/admin/orders/{{ $order['id'] }}/edit">
                                <i class="fas fa-pencil-alt">
                                </i>
                                Edit
                            </a>
                            <form style="display:inline" method="POST" action="{{ route('orders.destroy', $order->id) }}">
                                @method('DELETE')
                                @csrf
                                <button class="btn btn-danger btn-sm" type="submit">
                                    <i class="fas fa-trash">
                                    </i>
                                    Delete
                                </button>
                            </form> --}}
                        </td>
                    </tr>
                    @endif
                    @endforeach
                @else
                <tr class="brequest-b brequest-gray-200 hover:bg-gray-100"><td colspan="7" class="py-3 px-6 text-left">No orders found!</td></tr>
                @endif
            </tbody>
        </table>
        <div class="my-3 mx-3">
            {!! $orders->links() !!}
        </div>
    </div>
    <!-- /.card-body -->
    </div>
    <!-- /.card -->

</section>

<script type="text/javascript">
   window.onload = function() {
        var openmodal = document.querySelectorAll('.showDelBtn');
        for (var i = 0; i < openmodal.length; i++) {
            openmodal[i].addEventListener('click', function(event){
                event.preventDefault();
                toggleModal();
            });
        }
        
        var closemodal = document.querySelectorAll('.cancelDelBtn');
        for (var i = 0; i < closemodal.length; i++) {
            closemodal[i].addEventListener('click', function(event){
                event.preventDefault();
                toggleModal();
            });
        }

        function toggleModal () {
            const body = document.querySelector('body');
            const modal = document.querySelector('#confirmDelModal');
            modal.classList.toggle('opacity-0');
            modal.classList.toggle('invisible');
            modal.classList.toggle('visible');
            modal.classList.toggle('pointer-events-none');
            body.classList.toggle('modal-active');
        }
   }
</script>

<!-- /.content -->
@endsection


